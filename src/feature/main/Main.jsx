import React from "react";
import "./Main.scss";
import bgimg from "../../assets/images/mainBG.png";

export const Main = () => {
  return (
    <div id="mainpage">
      <div className="leftContent">
        <span>
          Enhance your online presence
          <span>Generate quality content</span>
        </span>
        <p>
          Artificial Intelligence that helps you generate and optimize content
          for social media and websites
        </p>
        <a href="/register">Get started</a>
      </div>
      <div className="list">
        <span>Social media content</span>
        <span>Websites</span>
        <span>Newsletters and Blogs</span>
      </div>
      <img src={bgimg}></img>
    </div>
  );
};
