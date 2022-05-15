import React from "react";
import img from "../../../assets/siteready.svg";
import "./siteReady.scss";

const siteready = () => {
  return (
    <div id="siteReady">
      <h2>
        Your site is <span>ready</span>
      </h2>
      <img src={img}></img>
    </div>
  );
};

export default siteready;
