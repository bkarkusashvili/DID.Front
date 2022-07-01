import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

import "./Dashboard.scss";

import { Card } from "../../shared";
import search from "../../assets/images/search.png";

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

export const Dashboard = () => {
  const [type, setType] = useState();
  const [list, setList] = useState([]);

  useEffect(() => {
    const data = !type ? post : post.filter((item) => item.type === type);

    setList(data);
  }, [type]);
  return (
    <div id="dashboard">
      <div className="contentcontrol">
        <div className="newpost">
          <button>Social</button>
          <button>Site</button>
          <button>Blog</button>
          <button>NFT</button>
          <form>
            <input placeholder="Search" />
            <button type="submit">
              <img src={search}></img>
            </button>
          </form>
          <select>
            <option>Sort By</option>
            <option>Social</option>
            <option>Site</option>
            <option>Blog</option>
            <option>NFT</option>
          </select>
        </div>
        <div className="search"></div>
      </div>
      <Swiper
        className="posttype"
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        autoplay={{ delay: 2000 }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {post.map((el, key) => (
          <SwiperSlide
            key={key}
            type={el.type}
            onClick={() => setType(el.type === type ? "" : el.type)}
            className={el.type === type ? "active" : ""}
            children={el.title}
          />
        ))}
      </Swiper>
      <div className="grid-container">
        {list.map((el, key) => (
          <Card key={key} color={el.color} title={el.title} />
        ))}
      </div>
    </div>
  );
};
