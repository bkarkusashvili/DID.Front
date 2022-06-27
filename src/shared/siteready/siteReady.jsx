import React from 'react';
import img from '../../assets/svg/siteready.svg';
import './siteReady.scss';

export const SiteReady = () => {
  return (
    <div id="siteReady">
      <h2>
        Your site is <span>ready</span>
      </h2>
      <img src={img}></img>
    </div>
  );
};
