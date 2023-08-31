import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../../env';
import './paymenttypecard.css';

export const PaymentTypeCard = ({ id, paymentType, name, descriptionText, duration, price }) => {
  const [phoneNumber, setPhoneNumber] = useState(null); // State to store the phone number input
  const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(false); // State to control when to show the phone number input

  const amount = duration * price;

  const justpay = async () => {
    // Check if a phone number has been entered
    if (!phoneNumber) {
      alert('Please enter your phone number');
      return;
    }

    const product = JSON.parse(localStorage.getItem('product'));
    const email = 'giorgi@gmail.com';

    try {
      const response = await axios.post(API + 'justpay', { amount, email,});
      window.location.href = response.data.response.response.transactionUrl;
    } catch (error) {
      console.error('Error:', error);
      console.log('An error occurred.');
    }
  };

  const subscriptionpay = async () => {

    const product = JSON.parse(localStorage.getItem('product'));
    const user_data = JSON.parse(localStorage.getItem('user_data'));

    const productId = product.subscription_product_id;
    const email = user_data.email;

    try {
      const response = await axios.post(API + 'create-subscription-transactionUrl', {
        productId,
        email,
      });
      window.location.href = response.data.data.transactionUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box">
      <div className="heading">{name}</div>
      <div className="circle">₾ {amount}</div>
      <div className="description">{descriptionText}</div>
      <div className="pay">
        <button
          onClick={() => {
            if (paymentType === 'subscriptionpay') {
              subscriptionpay();
            } else if (paymentType === 'justpay') {
              justpay();
            }
          }}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

