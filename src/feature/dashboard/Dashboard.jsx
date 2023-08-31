import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/autoplay';

import './Dashboard.scss';


import { Card } from '../../shared'; // Adjust the path accordingly if 'Card.jsx' is in a different subdirectory

import search from '../../assets/images/search.png';
import { API } from '../../env';

const post = [
  {
    title: 'Website',
    type: 'website',
    color: '#552F7C',
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
  const [list, setList] = useState([]);
  const user_id = localStorage.getItem('user_id')
  // ესააა რომ დეშბორდზე მოიტანოს ლისტიი
  const onDelete = (id) => {
    setList([...list.filter((el) => el.id !== id)]);
  };

  const dopList = [
    {
        "id": 54,
        "template_id": 55,
        "user_id": 124,
        "category_id": 50,
        "data": null,
        "status": "preparing",
        'subscription_product_id':null,
        "image": null,
        "created_at": "2023-07-26T23:42:59.000000Z",
        "updated_at": "2023-07-26T23:42:59.000000Z",
        "template": {
            "id": 55,
            "title": "\u10e1\u10d0\u10ec\u10d0\u10e0\u10db\u10dd",
            "old_url": "https:\/\/55.didge.site\/",
            "new_url": null,
            "size": 1,
            "image": "image\/template\/X7yMG7xjDARpTbWvhLoF0rkzxmOSFKG5PmRXQ4Es.jpg",
            "created_at": "2022-09-27T13:19:30.000000Z",
            "updated_at": "2023-04-24T10:21:52.000000Z",
            "categories": [
                50
            ]
        },
        "category": {
            "id": 50,
            "title": "\u10e1\u10d0\u10ec\u10d0\u10e0\u10db\u10dd",
            "category_id": 4,
            "created_at": "2022-09-19T15:43:00.000000Z",
            "updated_at": "2022-09-19T15:43:00.000000Z"
        }
    },
    {
        "id": 61,
        "template_id": 63,
        "user_id": 124,
        "category_id": 54,
        "data": null,
        "status": "draft",
        'subscription_product_id':null,
        "image": null,
        "created_at": "2023-07-29T11:48:40.000000Z",
        "updated_at": "2023-07-29T11:48:40.000000Z",
        "template": {
            "id": 63,
            "title": "\u10ef\u10d0\u10dc\u10db\u10e0\u10d7\u10d4\u10da\u10dd\u10d1\u10d0",
            "old_url": "https:\/\/63.didge.site\/",
            "new_url": null,
            "size": 1,
            "image": "image\/template\/7w6J0eymTdy9uezT14ElEx9cb4t460XEDbV3BlfD.jpg",
            "created_at": "2022-09-29T13:12:41.000000Z",
            "updated_at": "2023-04-24T10:19:08.000000Z",
            "categories": [
                54
            ]
        },
        "category": {
            "id": 54,
            "title": "\u10ef\u10d0\u10dc\u10db\u10e0\u10d7\u10d4\u10da\u10dd\u10d1\u10d0",
            "category_id": 5,
            "created_at": "2022-09-19T15:50:32.000000Z",
            "updated_at": "2022-09-19T15:50:32.000000Z"
        }
    }
]
  useEffect(() => {
    axios
      .get(API + 'get-all-site', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setList(res.data))
      .catch((err) => err.response.status === 401 && logout());

  }, []);
  useEffect(() => {
    // Fetch user data from the server
    axios.post(API + 'fetch-user-data', { user_id: user_id },{
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        // Store the fetched data in localStorage
        localStorage.setItem('user_data', JSON.stringify(response.data));
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  
  return (
    <div id="dashboard">
      <div className="contentcontrol">
        <div className="newpost">
          <Link to="/create/site">საიტი</Link>
          {/* <a
            href="https://xe8tbx8coxt.typeform.com/to/shpZNW5U"
            target="_blank"
          >
            საიტი
          </a> */}
          <form>
            <input placeholder="ძებნა" />
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
      {/* <Swiper
        className="posttype"
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        autoplay={{ delay: 2000 }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
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
      </Swiper> */}
      <div className="grid-container">
        {list.map((el, key) => (
          <Card
            key={key}
            site={el}
            token={token}
            list={list}
            type="dashboard"
            onDelete={onDelete}
          />
        ))}

        <div>
        </div>
      </div>
    </div>
  );
};
