import React from 'react';
import './ImageUpload.scss';
import ImageUploadIcon from '../../assets/svg/image-upload.svg';

export const ImageUpload = ({ image, setImage }) => {
  return (
    <label className="d-imageUpload">
      <img src={ImageUploadIcon} alt="Image Upload" />
      <div className="imageUpload-content">
        Drag and drop your file or <span>Browse</span>
      </div>
      <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
    </label>
  );
};
