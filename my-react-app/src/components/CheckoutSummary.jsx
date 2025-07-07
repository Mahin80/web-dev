import React from 'react';
import '../styles/summary.css';

const CheckoutSummary = ({ cart, selectedPayment }) => {
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  const shipping = (total > 100 || selectedPayment === 'online') ? 0 : 20;
  const subtotal = total + shipping;

  return (
    <div className="order-summary">
      <h3>Order Summary:</h3>
      <div className="summary-items">
        {cart.map(item => (
          <div key={item.id} className="summary-item">
            <span>{item.quantity}x</span>
            <img src={`http://localhost:5000${item.image}`} alt={item.name} style={{ width: '40px', margin: '0 10px' }} />
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
      </div>
      <p>Total: <span>${total}</span></p>
      <p>Shipping: <span>${shipping}</span></p>
      <p>Subtotal: <span>${subtotal}</span></p>
    </div>
  );
};

export default CheckoutSummary;
