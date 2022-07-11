import React from "react";
import "./Main.scss";
import bgimg from "../../assets/images/mainBG.png";
import { Link } from "react-router-dom";

export const Main = () => {
  return (
    <div id="mainpage">
      <div className="section-1">
        <div className="container">
          <div className="leftContent">
            <span>
              Enhance your online presence
              <span>Generate quality content</span>
            </span>
            <p>
              Artificial Intelligence that helps you generate and optimize
              content for social media and websites
            </p>
            <Link to="/register">Get started</Link>
          </div>
          <div className="list">
            <span>Social media content</span>
            <span>Websites</span>
            <span>Newsletters and Blogs</span>
          </div>
        </div>
        <img src={bgimg}></img>
      </div>
    </div>
  );
};
