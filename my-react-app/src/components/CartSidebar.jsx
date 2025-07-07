import React from 'react';
import '../styles/cartsidebar.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ open, onClose }) => {
  const { cart, changeQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const goToCheckout = () => {
    navigate('/checkout');
  };

  const totalCartAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (index, delta) => {
    const item = cart[index];
    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) return;
    if (newQuantity > item.stock) {
      alert(`Only ${item.stock} units of ${item.name} available.`);
      return;
    }
    changeQuantity(index, delta);
  };

  const getRemainingStock = (item) => {
    return item.stock - item.quantity;
  };

  return (
    <div id="cartSidebar" className={`cart-sidebar ${open ? 'show' : 'hidden'}`}>
      <button id="closeCart" className="close-cart-btn" onClick={onClose}>
        &#8592;
      </button>
      <h2>Shopping Cart</h2>

      <div id="cartItems">
        {cart.length === 0 ? (
          <p style={{ fontFamily: 'Serif', marginLeft: '50px', marginTop: '50px' }}>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => {
              const total = item.price * item.quantity;
              const remainingStock = getRemainingStock(item);
              return (
                <div
                  key={index}
                  className="cart-item"
                  style={{
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '10px',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    style={{ width: '50px', marginRight: '10px' }}
                  />
                  <div>
                    <strong>{item.name}</strong>
                    <div>{item.price}$ x {item.quantity}</div>
                    <div>Total: {total}$</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>(Remaining stock: {remainingStock})</div>
                  </div>
                  <div
                    className="cart-actions"
                    style={{
                      marginLeft: 'auto',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '4px'
                    }}
                  >
                    <button onClick={() => handleQuantityChange(index, -1)}><i className="fa-solid fa-minus"></i></button>
                    <button onClick={() => handleQuantityChange(index, 1)}><i className="fa-solid fa-plus"></i></button>
                    <button onClick={() => removeFromCart(index)}><i className="fa-solid fa-xmark"></i></button>
                  </div>
                </div>
              );
            })}

            <div
              className="cart-total"
              style={{
                marginTop: '20px',
                borderTop: '2px solid #999',
                paddingTop: '10px',
                fontFamily: 'serif'
              }}
            >
              <p style={{ fontSize: '16px' }}><strong>Total: {totalCartAmount.toFixed(2)}$</strong></p>
              <button
                onClick={goToCheckout}
                style={{
                  padding: '10px 15px',
                  fontFamily: 'serif',
                  background: '#8a422b',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '5px'
                }}
              >
                Go to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
