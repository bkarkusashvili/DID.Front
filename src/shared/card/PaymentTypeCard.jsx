import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../../env';
import './paymenttypecard.css';

export const PaymentTypeCard = ({ id, paymentType, name, descriptionText, duration, price }) => {
  const [phoneNumber, setPhoneNumber] = useState(null); // State to store the phone number input
  const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(false); // State to control when to show the phone number input

  const amount = duration * price;


  const justpay = async () => {
    const product = JSON.parse(localStorage.getItem('product'));
    const user = JSON.parse(localStorage.getItem('user_data'));
    const email = user.email;
  
    try {
      const response = await axios.post(API + 'justpay', { amount, email });
      window.location.href = response.data.response.response.transactionUrl;

      
      // Assuming payment is successful and you're redirected back after payment
  
      // Triggering backend to update site status
      
      
      // Rest of your code...
    } catch (error) {
      console.error('Error:', error);
      console.log('An error occurred.');
    }
  };
  

  

  return (
    <div className="box">
      <div className="heading">{name}</div>
      <div className="circle">₾ {amount}</div>
      <div className="description">{descriptionText}</div>
      <div className="pay">
        <button
          onClick={() => {justpay();}}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

