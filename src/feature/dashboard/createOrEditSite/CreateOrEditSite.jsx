import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import jsonToFormData from 'json-form-data';

import { API } from '../../../env';
import { Radio } from '../../../shared';

import './CreateOrEditSite.scss';

import loading from '../../../assets/svg/loading.svg';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

const types = [
  'Apply Emojis',
  'Apply Logo',
  'Apply Branding Style',
  'Generate Text on Photo',
];

export const CreateOrEditSite = ({ token, logout }) => {
  const [isTextLoading, setIsTextLoading] = useState(false);
  const [item, setItem] = useState({});
  const [images, setImages] = useState([]);
  const [suggestedPhotos, setSuggestedPhotos] = useState([]);
  const { type, id } = useParams();
  const isEdit = useMemo(() => !!id, [id]);
  const navigate = useNavigate();

  const { values, handleChange, setFieldValue } = useFormik({
    initialValues: {},
  });

  const createOrUpdate = (onlyTitle = false) => {
    const data = onlyTitle ? { title: values.title } : values;
    const URL = API + type + (isEdit ? `/${id}` : '');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    axios
      .post(URL, jsonToFormData(data), { headers })
      .then((res) => {
        const id = res.data.id;

        navigate(`/edit/${type}/${id}`);
      })
      .catch((err) => err.response.status === 401 && logout());
  };

  const deleteItem = () => {
    const URL = `${API}${type}/delete/${id}`;
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .delete(URL, { headers })
      .then(() => navigate(`/dashboard`))
      .catch((err) => err.response.status === 401 && logout());
  };

  const toggleKeyword = (event) => {
    const value = event.target.value;

    if (event.key === 'Enter') {
      setFieldValue('keywords', [...(values.keywords || []), value]);
      event.target.value = '';
    } else if (
      event.key === 'Backspace' &&
      value === '' &&
      values.keywords &&
      values.keywords.length > 0
    ) {
      values.keywords.pop();
      setFieldValue('keywords', [...values.keywords]);
    }
  };

  const generateText = () => {
    if (!values.keywords || !values.keywords.length) return;
    const headers = { Authorization: `Bearer ${token}` };
    setIsTextLoading(true);

    Promise.all([
      axios
        .post(API + 'generate/text', { keywords: values.keywords }, { headers })
        .then((res) => setFieldValue('text', res.data)),
      axios
        .post(
          API + 'generate/image',
          { keywords: values.keywords },
          { headers }
        )
        .then((res) => setSuggestedPhotos(res.data)),
    ]).finally(() => setIsTextLoading(false));
  };

  const generatePhoto = () => {
    setFieldValue(
      'suggestedPhoto',
      suggestedPhotos[Math.floor(Math.random() * 14)].src.large2x
    );
  };

  const insertImages = (e) =>
    setFieldValue('materials', Array.from(e.target.files));

  const previwImages = (e) => {
    const files = Array.from(e.target.files);

    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setImages(imageUrls);
    setFieldValue('photos', files);
  };

  useEffect(() => {
    if (!suggestedPhotos.length) return;

    generatePhoto();
  }, [suggestedPhotos]);

  useEffect(() => {
    if (!id) return setItem({});

    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get(API + `social/${id}`, { headers })
      .then((res) => setItem(res.data));
  }, [id]);

  return (
    <div id="CreateOrEdit">
      <div className="head">
        <h3>საიტის სახელი</h3>
        <div className="actions-wrap">
          <div className="title-wrap">
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="ჩაწერე საიტის სახელი"
            />
            <button onClick={() => createOrUpdate(true)} />
          </div>
          <div className="actions">
            {isEdit && (
              <button
                className="btn delete"
                onClick={deleteItem}
                children="წაშლა"
              />
            )}
            <button
              className="btn publish"
              onClick={() => createOrUpdate(false)}
              children="დამატება"
            />
          </div>
        </div>
      </div>
      <div className="form">
        <FormControl fullWidth variant="filled">
          <InputLabel>ინდუსტრია</InputLabel>
          <Select value={1}>
            <MenuItem value={1}>Accounting</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="აღწერე შენი ბიზნესი" variant="filled" />
        <FormControl fullWidth variant="filled">
          <InputLabel>რისტვის აკეთებ ვებსაიტს</InputLabel>
          <Select>
            <MenuItem value={0}>კომპანია</MenuItem>
            <MenuItem value={1}>პროდუქტი</MenuItem>
            <MenuItem value={2}>სერვისი</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="ბიზნესი/კომპანიის სახელი"
          variant="filled"
        />
        <TextField fullWidth label="ელ-ფოსტა" variant="filled" />
        <TextField fullWidth label="ტელეფონი" variant="filled" />
      </div>
    </div>
  );
};
