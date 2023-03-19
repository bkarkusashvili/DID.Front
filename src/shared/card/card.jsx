import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Card.scss';
import { API, WEB } from '../../env';
import { Eye, Heart, Check, Delete, Edit } from '../SVG';

const prices = [35, 49, 69];
const sizes = ['S', 'M', 'L'];

export const Card = ({
  type,
  site,
  template,
  category,
  onChoose,
  onDelete,
  token,
}) => {
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();

  template = site ? site.template : template;
  category = site ? site.category : category;

  const updateFavorite = () => {
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .post(
        API + 'favorite',
        { template: template.id, category: category.id },
        { headers }
      )
      .then(() => setFav(!fav));
  };

  const deleteSite = () => {
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .delete(API + 'site/' + site.id, { headers })
      .then(() => onDelete(site.id));
  };

  return (
    <div key={template.id} className="card-item">
      <a
        className="image-wrap"
        href={template.old_url}
        rel="noreferrer"
        target="_blank"
      >
        <img src={WEB + 'storage/' + template.image} />
      </a>
      <div className="content">
        <div className="head">
          <h3>
            {category.title} {sizes[template.size]} - {prices[template.size]}{' '}
            ლარი
          </h3>
        </div>
        <div className="footer">
          <div className="info">
            <div className="info-item">
              ზომა: <span>{sizes[template.size]}</span>
            </div>
            <div className="info-item">
              ფასი: <span>{prices[template.size]} ლარი</span>
            </div>
          </div>
          <div className="action">
            <a
              href={template.old_url}
              className="action-item"
              rel="noreferrer"
              target="_blank"
            >
              <Eye />
            </a>
            {type === 'choose' && (
              <>
                <button
                  className={['action-item', fav && 'active'].join(' ')}
                  onClick={updateFavorite}
                >
                  <Heart />
                </button>
                <button
                  className="action-item action-item-last choose"
                  onClick={onChoose}
                >
                  <Check />
                  არჩევა
                </button>
              </>
            )}
            {type === 'dashboard' && (
              <>
                <button
                  className={['action-item delete', fav && 'active'].join(' ')}
                  onClick={deleteSite}
                >
                  <Delete />
                </button>
                <button
                  className="action-item action-item-last edit"
                  onClick={() => navigate(`/form/${site.id}`)}
                >
                  <Edit />
                  შევსება
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
