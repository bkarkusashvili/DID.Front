import React, { useState } from 'react';

import './ImageUpload.scss';
import ImageUploadIcon from '../../assets/svg/image-upload.svg';

export const ImageUpload = ({ onChange }) => {
  const [image, setImage] = useState();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const preview = event.target.files[0];

      setImage(URL.createObjectURL(preview));

      onChange(preview);
    }
  };

  return (
    <label
      className="d-imageUpload"
      style={{ backgroundImage: `url("${image}")` }}
    >
      <img src={ImageUploadIcon} alt="Image Upload" />
      <div className="imageUpload-content">
        ჩააგდე ფოტო ან <span>ატვირთე</span>
      </div>
      <input type="file" hidden onChange={onImageChange} />
    </label>
  );
};
