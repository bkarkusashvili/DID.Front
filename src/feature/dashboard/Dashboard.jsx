import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/autoplay';

import './Dashboard.scss';

import { Card } from '../../shared';
import search from '../../assets/images/search.png';
import { API } from '../../env';

const post = [
  {
    title: 'Website',
    type: 'website',
    color: '#62718E',
  },
  {
    title: 'facebook',
    type: 'facebook',
    color: '#1877F1',
  },
  {
    title: 'instagram',
    type: 'instagram',
    color: '#D7145A',
  },
  {
    title: 'Twitter',
    type: 'twitter',
    color: '#1d9bf0',
  },
  {
    title: 'linkedin',
    type: 'linkedin',
    color: '#0077B5',
  },
  {
    title: 'Blog',
    type: 'blog',
    color: '#FF8033',
  },
];

export const Dashboard = ({ token, logout }) => {
  const [type, setType] = useState();
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   const data = !type ? post : post.filter((item) => item.type === type);

  //   setList(data);
  // }, [type]);

  // console.log(list);

  useEffect(() => {
    axios
      .get(API + 'get-all', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setList(res.data))
      .catch((err) => err.response.status === 401 && logout());
  }, []);

  console.log(list);

  return (
    <div id="dashboard">
      <div className="contentcontrol">
        <div className="newpost">
          <Link to="/create/social">New</Link>
          {/* <a
            href="https://xe8tbx8coxt.typeform.com/to/shpZNW5U"
            target="_blank"
          >
            Site
          </a> */}
          {/* <Link to="/create/blog">Blog</Link> */}
          {/* <Link to="/create/nft">NFT</Link> */}
          <form>
            <input placeholder="Search" />
            <button type="submit">
              <img src={search}></img>
            </button>
          </form>
          {/* <select>
            <option>Sort By</option>
            <option>Social</option>
            <option>Site</option>
            <option>Blog</option>
            <option>NFT</option>
          </select> */}
        </div>
        <div className="search"></div>
      </div>
      <Swiper
        className="posttype"
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        autoplay={{ delay: 2000 }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {post.map((el, key) => (
          <SwiperSlide
            key={key}
            type={el.type}
            onClick={() => setType(el.type === type ? '' : el.type)}
            className={el.type === type ? 'active' : ''}
            children={el.title}
          />
        ))}
      </Swiper>
      <div className="grid-container">
        {list.map((el, key) => (
          <Card key={key} color="#1877F1" data={el} />
        ))}
      </div>
    </div>
  );
};
