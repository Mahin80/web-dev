import React from 'react';
import '../styles/thankyou.css'; 

const ThankYou = () => {
  return (
    <div className="thank-you-page">
      <div className="thank-you-box">
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully. We appreciate your support!</p>
        <a href="/home" className="btn-home">Return to Home</a>
      </div>
    </div>
  );
};

export default ThankYou;
