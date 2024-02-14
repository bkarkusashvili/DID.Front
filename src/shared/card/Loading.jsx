import React, { useEffect, useState } from 'react';
import { API } from '../../env';
import axios from 'axios';

export default function Loading({ loadingFor,token }) {
  const [transactionId , setTransactionId] = useState(null);
  useEffect(() => {

    const fetchData = async () => {
      const product = JSON.parse(localStorage.getItem('product'));
      const user = JSON.parse(localStorage.getItem('user_data'));
      const selectedDuration = localStorage.getItem('selectedDuration');
      const currentUrl = window.location.href;
      console.log(currentUrl)
      const urlParts = currentUrl.split('=');
      console.log(urlParts)

      try {
        if (loadingFor === 'activate-site') {
          await axios.post(API + `activatesite/${product.id}`, /* Other necessary data */);
  
          await axios.post(API + 'justpay/callback/successful', 
          {
             site_id : product.id, duration:selectedDuration, transaction_id : urlParts[1] 
          }, 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
          )
            .then(res => {
              // console.log(res.data['message']);
              // Redirect to dashboard after activation and email sending
              window.location.href = '/dashboard';
            })
            .catch(error => {
              console.error('Error sending email:', error);
            });
        } else if (loadingFor === 'failed-transaction') {
          await axios.post(API + 'justpay/callback/error', { },
          {
            headers: { Authorization: `Bearer ${token}` }
          })
            .then(res => {
              // console.log(res.data['message']);
              // Redirect to dashboard after failed transaction and email sending
              window.location.href = '/dashboard';
            })
            .catch(error => {
              console.error('Error sending email:', error);
            });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();

    // Add dependencies if necessary
  }, [loadingFor]);

  return <div>Loading</div>;
}
