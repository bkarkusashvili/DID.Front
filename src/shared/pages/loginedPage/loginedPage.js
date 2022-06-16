import React, { useEffect, useState } from "react";
import Mainlayout from "../../../core/layout/mainLayout";
import "./loginedPage.scss";
import Card from "../../component/card/card";
import editicon from "../../../assets/editicon.png";
import search from "../../../assets/search.png";

const postType = [
  { title: "Website", img: editicon, color: "#552F7C", type: "website" },
  { title: "facebook", img: editicon, color: "#1877F1", type: "facebook" },
  { title: "instagram", img: editicon, color: "#D7145A", type: "instagram" },
  { title: "Twitter", img: editicon, color: "#1d9bf0", type: "twitter" },
  { title: "linkedin", img: editicon, color: "#0077B5", type: "linkedin" },
  { title: "Blog", img: editicon, color: "#FF8033", type: "blog" },
];

const post = [
  {
    title: "Website",
    type: "website",
    color: "#552F7C",
  },
  {
    title: "facebook",
    type: "facebook",
    color: "#1877F1",
  },
  {
    title: "instagram",
    type: "instagram",
    color: "#D7145A",
  },
  {
    title: "Twitter",
    type: "twitter",
    color: "#1d9bf0",
  },
  {
    title: "linkedin",
    type: "linkedin",
    color: "#0077B5",
  },

  {
    title: "Blog",
    type: "blog",
    color: "#FF8033",
  },
];

const LoginedPage = () => {
  const [type, setType] = useState();
  const [list, setList] = useState([]);

  useEffect(() => {
    const data = !type ? post : post.filter((item) => item.type === type);

    setList(data);
  }, [type]);
  return (
    <>
      <Mainlayout>
        <div id="loginedPage">
          <div className="contentcontrol">
            <div className="newpost">
              <button>Social media poster</button>
              <button>New Site</button>
              <button>New Blog</button>
              <form>
                <input placeholder="Search" />
                <button type="submit">
                  <img src={search}></img>
                </button>
              </form>
              <select>
                <option>Sort by</option>
                <option>Sort by1</option>
                <option>Sort by2</option>
              </select>
            </div>
            <div className="search"></div>
          </div>
          <div className="posttype">
            {post.map((el, key) => (
              <>
                <button
                  key={key}
                  type={el.type}
                  onClick={() => setType(el.type === type ? "" : el.type)}
                  className={el.type === type ? "active" : ""}
                >
                  {el.title}
                </button>
              </>
            ))}
          </div>
          <div className="grid-container">
            {list.map((el) => (
              <Card color={el.color} title={el.title} />
            ))}
          </div>
        </div>
      </Mainlayout>
    </>
  );
};

export default LoginedPage;
