import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Contact from '../src/pages/Contact';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';
import Products from '../src/pages/Products';
import Profile from '../src/pages/Profile';
import Dashboard from '../src/pages/Dashboard'
import Checkout from '../src/pages/Checkout';
import ThankYou from './pages/Thankyou';
import ForgetPassword from './pages/ForgotPassword';
import { CartProvider } from './context/CartContext';

function App() {
  return (
      <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path ="/home" element ={<Home/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path= "/forgotpassword" element={<ForgetPassword/>}/>
        <Route path="/products" element ={<Products/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path ="/dashboard" element ={<Dashboard/>}/>
        <Route path ="/checkout" element ={<Checkout/>}/>
        <Route path ="/thankyou" element ={ <ThankYou/>}/>

      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
