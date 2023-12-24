import React, { useEffect } from 'react';
import { API } from '../../env';
import axios from 'axios';

export default function Loading() {
  const product = JSON.parse(localStorage.getItem('product'));
  const user = JSON.parse(localStorage.getItem('user_data'));
  const email = user.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.post(API + `activatesite/${product.id}`, /* Other necessary data */);

        await axios.post(API + 'send-mail', { email: user.email, type: 'bought' })
          .then(res => {
            console.log(res.data['message']);
            // Redirect to dashboard after activation and email sending
            window.location.href = '/dashboard';
          })
          .catch(error => {
            console.error('Error sending email:', error);
          });
      } catch (error) {
        console.error('Error activating site:', error);
      }
    };

    fetchData();
  }, [product.id, user.email]);

  return <div>Loading</div>;
}
