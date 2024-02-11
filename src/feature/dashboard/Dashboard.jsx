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

// const post = [
//   {
//     title: 'Website',
//     type: 'website',
//     color: '#552F7C',
//   },
//   {
//     title: 'facebook',
//     type: 'facebook',
//     color: '#1877F1',
//   },
//   {
//     title: 'instagram',
//     type: 'instagram',
//     color: '#D7145A',
//   },
//   {
//     title: 'Twitter',
//     type: 'twitter',
//     color: '#1d9bf0',
//   },
//   {
//     title: 'linkedin',
//     type: 'linkedin',
//     color: '#0077B5',
//   },
//   {
//     title: 'Blog',
//     type: 'blog',
//     color: '#FF8033',
//   },
// ];

export const Dashboard = ({ token, logout }) => {
  const [list, setList] = useState([]);
  const user_id = localStorage.getItem('user_id')
  // ესააა რომ დეშბორდზე მოიტანოს ლისტიი
  const onDelete = (id) => {
    setList([...list.filter((el) => el.id !== id)]);
  };
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
    axios.post(API + 'fetch-user-data',{},{
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


  useEffect(() => {
    // Get the query parameters from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const paymentTransactionId = searchParams.get('payment_transaction_id');

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user_data'));

    if (paymentTransactionId && userData) {
      const { id: userId, email } = userData;
      
      axios.post(API + `save-payment-transaction/${paymentTransactionId}`, {
        userId, // Send the userId
        email, // Send the email
      })
        .then(response => {
          // Handle the response from the backend if needed
          console.log(response.data); // You can log the response to the console
        })
        .catch(error => {
          // Handle errors
          console.error(error);
        });
    }
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
