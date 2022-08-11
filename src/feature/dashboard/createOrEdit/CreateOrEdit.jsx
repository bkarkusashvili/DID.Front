import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import jsonToFormData from 'json-form-data';

import { API } from '../../../env';
import { Radio } from '../../../shared';

import './CreateOrEdit.scss';

import loading from '../../../assets/svg/loading.svg';

const types = [
  'Apply Emojis',
  'Apply Logo',
  'Apply Branding Style',
  'Generate Text on Photo',
];

export const CreateOrEdit = ({ token, logout }) => {
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
        <div className="actions-wrap">
          <div className="title-wrap">
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Enter post Title"
            />
            <button onClick={() => createOrUpdate(true)} />
          </div>
          <div className="actions">
            {isEdit && (
              <button
                className="btn delete"
                onClick={deleteItem}
                children="Delete"
              />
            )}
            <button
              className="btn publish"
              onClick={() => createOrUpdate(false)}
              children="Publish"
            />
          </div>
        </div>
      </div>
      <div className="form">
        <div className="image-form">
          <div className="uploadedImg">
            <div className="imgUpload">
              <div className="file-input">
                <span children="Drag and drop your photos or" />
                <button
                  children="Browse"
                  onClick={(e) => e.target.nextSibling.click()}
                />
                <input
                  type="file"
                  name="photos"
                  hidden
                  multiple
                  onChange={(e) => previwImages(e)}
                />
              </div>
              <span>3 photos maximum</span>
            </div>
            {!!values.photos &&
              !!values.photos.length &&
              values.photos.map((item, key) => (
                <div key={key} className="imgBox">
                  <span children={item.name}></span>
                  <img src={images[key]} alt="" />
                </div>
              ))}
          </div>
          <div className="generImg">
            <span>Suggested Photo will be genarated here</span>
            <img src={values.suggestedPhoto} alt="" />
            <button onClick={generatePhoto}>Regenerate</button>
          </div>
        </div>

        <div className="main-form">
          <div className="type-wrap">
            <h3>Generate Facebook post</h3>
            <div className="list">
              {types.map((item, key) => (
                <div
                  key={key}
                  className="item"
                  onClick={() => setFieldValue('type', key)}
                >
                  <span>{item}</span>
                  <Radio
                    active={values.type === key}
                    style={{ backgroundColor: '#FFFFFF' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="keyword-wrap">
            <h3>Ask AI to</h3>
            <div className="keywords">
              <div className="list">
                {values.keywords &&
                  values.keywords.map((item, kye) => (
                    <span key={kye} children={item} />
                  ))}
                <input type="text" onKeyUp={toggleKeyword} />
              </div>
              <button
                disabled={isTextLoading}
                children={
                  isTextLoading ? <img src={loading} alt="Loading" /> : 'Go'
                }
                onClick={generateText}
              />
            </div>
          </div>

          <div className="text-wrap">
            <h3>AI wrote</h3>
            <div className="text-container">
              <textarea
                name="text"
                onChange={handleChange}
                value={values.text}
                children={values.text}
              />
            </div>
          </div>

          <div className="input-wrap">
            <h3>On photo text field</h3>
            <input
              type="text"
              name="photoText"
              value={values.photoText}
              onChange={handleChange}
            />
          </div>

          <div className="images-wrap">
            <h3>
              Upload other materials or logos you would like to use in this post
            </h3>
            <div className="images">
              <div className="file-input">
                <span children="Drag and drop or" />
                <button
                  children="Browse"
                  onClick={(e) => e.target.nextSibling.click()}
                />
                <input
                  type="file"
                  name="materials"
                  hidden
                  multiple
                  onChange={insertImages}
                />
              </div>
              {!!values.materials && !!values.materials.length && (
                <div className="list">
                  {values.materials.map((item, key) => (
                    <div key={key} className="item">
                      <span children={item.name} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="input-wrap">
            <h3>Leave your comment here</h3>
            <input
              type="text"
              name="comment"
              value={values.comment}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
