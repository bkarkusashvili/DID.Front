import React from "react";
import Mainlayout from "../../../core/layout/mainLayout";
import "./loginedPage.scss";
import Card from "../../component/card/card";

const data = [1, 2, 3, 4];

const loginedPage = () => {
  return (
    <>
      <Mainlayout>
        <div id="loginedPage">
          <div className="contentcontrol">
            <div className="newpost">
              <button>Social media poster</button>
              <button>New Site</button>
            </div>
            <div className="search">
              <button>Search</button>
              <select>
                <option>Sort by</option>
                <option>Sort by1</option>
                <option>Sort by2</option>
              </select>
            </div>
          </div>
          <div className="posttype">
            <button>Website</button>
            <button>facebook</button>
            <button>instagram</button>
            <button>Twitter</button>
          </div>
          <div className="grid-container">
            {data.map((el) => (
              <Card />
            ))}
          </div>
        </div>
      </Mainlayout>
    </>
  );
};

export default loginedPage;
