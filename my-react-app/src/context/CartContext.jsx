import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateCartIcon = () => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const icon = document.querySelector('.fa-cart-shopping');
    if (!icon) return;

    let badge = document.querySelector('.cart-count');
    if (!badge) {
      badge = document.createElement('span');
      badge.classList.add('cart-count');
      icon.parentElement.appendChild(badge);
    }

    badge.textContent = total > 0 ? total : '';
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      const totalRequested = (existingItem?.quantity || 0) + quantity;

      if (totalRequested > product.stock) {
        alert(`Only ${product.stock} items in stock.`);
        return prevCart;
      }

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const changeQuantity = (index, delta) => {
    setCart(prev => {
      const newCart = [...prev];
      const item = { ...newCart[index] };
      item.quantity += delta;

      if (item.quantity <= 0) {
        newCart.splice(index, 1);
      } else {
        newCart[index] = item;
      }

      return newCart;
    });
  };


  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, changeQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
