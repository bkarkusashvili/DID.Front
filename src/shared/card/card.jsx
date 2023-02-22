import * as React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import img from '../../assets/images/cover.png';
import './card.scss';
import { WEB } from '../../env';

export const Card = ({ data, color }) => {
  return (
    <div className="card">
      <div className="top">
        <h2 style={{ backgroundColor: color }}>
          {data.template.categories[0].title} -{' '}
          {moment(data.created_at).format('DD.MM.YYYY')}
        </h2>
        <div className="imgwraper">
          <img
            src={WEB + 'storage/' + data.template.image || img}
            alt="Social"
          ></img>
          <span>{data.status}</span>
        </div>
      </div>
      <div className="bottom">
        {/* <p>{data.template.categories.map((item) => item.title).join(' & ')}</p> */}
        {/* <span>domain.com</span> */}
        <div className="buttons">
          <Link to={`/form/${data.id}`} children="შევსება" />
          {/* <Link to={`/edit/social/${data.id}`} children="რედაქტირება" /> */}
          {/* <button>გაგზავნა</button> */}
        </div>
      </div>
    </div>
  );
};
