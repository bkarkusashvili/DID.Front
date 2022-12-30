import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import jsonToFormData from 'json-form-data';

import { API, WEB } from '../../../env';
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
  const [step, setStep] = useState(1);
  const [item, setItem] = useState({});
  const [list, setList] = useState([]);
  const [cat, setCat] = useState([]);
  const [templates, setTemplates] = useState({
    small: {},
    medium: {},
    large: {},
  });
  const [images, setImages] = useState([]);
  const [suggestedPhotos, setSuggestedPhotos] = useState([]);
  const { type, id } = useParams();
  const isEdit = useMemo(() => !!id, [id]);
  const navigate = useNavigate();

  const { values, handleChange, setFieldValue } = useFormik({
    initialValues: {},
  });

  const updateTemplates = (e) => {
    const list = cat[e.target.value].templates;
    const temp = {
      small: {},
      medium: {},
      large: {},
    };

    list.forEach((item) => {
      if (item.size === 0) {
        temp.small = item;
      }
      if (item.size === 1) {
        temp.medium = item;
      }
      if (item.size === 2) {
        temp.large = item;
      }

      setTemplates(temp);
    });
  };

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
    const headers = { Authorization: `Bearer ${token}` };

    axios.get(API + 'template', { headers }).then((res) => setList(res.data));
  }, []);

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
    <div id="CreateOrEditSite">
      <div className="head"></div>
      <div className="form">
        <div className={['step step-1', step === 1 ? 'active' : ''].join(' ')}>
          <FormControl fullWidth variant="filled">
            <InputLabel>ინდუსტრია</InputLabel>
            <Select onChange={(e) => setCat(list[e.target.value].children)}>
              {list.map((item, key) => (
                <MenuItem key={item.id} value={key}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="filled" disabled={!cat.length}>
            <InputLabel>კატეგორია</InputLabel>
            <Select onChange={updateTemplates}>
              {cat.map((item, key) => (
                <MenuItem key={item.id} value={key}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={['step step-2', step === 2 ? 'active' : ''].join(' ')}>
          <div className="templates">
            {!!templates.small?.id && (
              <div className="item">
                <label className="heads">
                  <span>S - 35 ლარი</span>
                  <input type="radio" name="theme" />
                </label>
                <a href={templates.small.old_url} target="_blank">
                  <img src={WEB + 'storage/' + templates.small.image} />
                </a>
              </div>
            )}
            {!!templates.medium?.id && (
              <div className="item">
                <label className="heads">
                  <span>M - 49 ლარი</span>
                  <input type="radio" name="theme" />
                </label>
                <a href={templates.medium.old_url} target="_blank">
                  <img src={WEB + 'storage/' + templates.medium.image} />
                </a>
              </div>
            )}
            {!!templates.large?.id && (
              <div className="item">
                <label className="heads">
                  <span>L - 69 ლარი</span>
                  <input type="radio" name="theme" />
                </label>
                <a href={templates.large.old_url} target="_blank">
                  <img src={WEB + 'storage/' + templates.large.image} />
                </a>
              </div>
            )}
          </div>
        </div>
        <div className={['step step-3', step === 3 ? 'active' : ''].join(' ')}>
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
        <div className="actions">
          {step > 1 && (
            <button
              onClick={() => step !== 1 && setStep(step - 1)}
              className="prev-step"
            >
              წინა
            </button>
          )}
          <button
            onClick={() => step !== 3 && setStep(step + 1)}
            className="next-step"
          >
            {step === 3 ? 'ყიდვა' : 'შემდეგი'}
          </button>
        </div>
      </div>
    </div>
  );
};
