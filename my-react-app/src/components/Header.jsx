import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';
import { useCart } from '../context/CartContext';

const Header = ({ onCartClick }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const isLoggedIn = !!token;

  const { cart } = useCart();

  const handleUserClick = (e) => {
    e.preventDefault();
    navigate(isLoggedIn ? '/profile' : '/signup');
  };

  // Count total quantity
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="main-header">
      <div className="logo">Bloom Pantry</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/products">Products</Link>
      </nav>
      <div className="nav-icons">
        <a href="#" onClick={handleUserClick}>
          <i className="fa-regular fa-user"></i>
        </a>
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={onCartClick}>
          <i className="fa-solid fa-cart-shopping" style={{ marginTop: '5px' }}></i>
          {totalItems > 0 ? (
            <span className="cart-count" style={{
              position: 'absolute',
              top: '-5px',
              right: '-20px',
              background: 'red',
              color: 'white',
              fontSize: '12px',
              fontFamily:'Serif',
              padding: '2px 5px',
              borderRadius: '60%',
              minWidth: '10px',
              textAlign: 'center',
              lineHeight: '1',
              
            }}>
              {totalItems}
            </span>
          ) : null}

        </div>
      </div>
    </header>
  );
};

export default Header;
