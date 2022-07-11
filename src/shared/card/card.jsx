import * as React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import img from '../../assets/images/cover.png';
import './card.scss';

export const Card = ({ data, color }) => {
  return (
    <div className="card">
      <div className="top">
        <h2 style={{ backgroundColor: color }}>
          {data.title} - {moment(data.created_at).format('DD.MM.YYYY')}
        </h2>
        <div className="imgwraper">
          <img src={img} alt="Social"></img>
          <span>status</span>
        </div>
      </div>
      <div className="bottom">
        <p>Accounting & Financial Services</p>
        <span>domain.com</span>
        <div className="buttons">
          <Link to={`/edit/social/${data.id}`} children="Edit" />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};
