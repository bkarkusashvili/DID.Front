import React from "react";
import "./Main.scss";
import bgimg from "../../assets/images/mainBG.png";
import { Link } from "react-router-dom";
import socialone from "../../assets/images/social-1.png";
import socialtwo from "../../assets/images/social-2.png";
import newsite from "../../assets/images/newsite.svg";
import branding from "../../assets/images/branding.png";

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
      <div className="section-2">
        <div className="container">
          <div className="leftContent">
            <h2>Social media content</h2>
            <p>
              Dogs have proven themselves time and again to be loyal, kind,
              understanding,
              <br />
              <br />
              may have been the worst day of our lives and make us feel better
              with a wag of their tail and a playful grin.
              <br />
              <br />
              happily after what may have been the worst day of our lives and
              make us eir tail and a playful grin.
            </p>
          </div>
          <div className="img-wrapper">
            <img src={socialone}></img>
            <img src={socialtwo}></img>
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="container">
          <div className="leftContent">
            <h2>Create Website content</h2>
            <p>
              Dogs have proven themselves time and again to be loyal, kind,
              understanding,
              <br />
              <br />
              may have been the worst day of our lives and make us feel better
              with a wag of their tail and a playful grin.
              <br />
              <br />
              happily after what may have been the worst day of our lives and
              make us eir tail and a playful grin.
            </p>
          </div>
          <div className="img-wrapper">
            <img src={newsite}></img>
          </div>
        </div>
      </div>
      <div className="section-4">
        <div className="container">
          <div className="leftContent">
            <h2>Branding elements applied</h2>
            <p>
              Dogs have proven themselves time and again to be loyal, kind,
              understanding,
              <br />
              <br />
              may have been the worst day of our lives and make us feel better
              with a wag of their tail and a playful grin.
              <br />
              <br />
              happily after what may have been the worst day of our lives and
              make us eir tail and a playful grin.
            </p>
          </div>
          <div className="img-wrapper">
            <img src={branding}></img>
          </div>
        </div>
      </div>
    </div>
  );
};
