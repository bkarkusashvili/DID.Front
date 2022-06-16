import * as React from "react";
import img from "../../../assets/cover.png";
import "./card.scss";

function card({ color, title }) {
  return (
    <div className="card">
      <div className="top">
        <h2 style={{ backgroundColor: color }}>{title} - 20.06.2022</h2>
        <div className="imgwraper">
          <img src={img}></img>
          <span>status</span>
        </div>
      </div>
      <div className="bottom">
        <p>Accounting & Financial Services</p>
        <span>domain.com</span>
        <div className="buttons">
          <button>Edit</button>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default card;
