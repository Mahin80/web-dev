import React from 'react';
import '../styles/footer.css'; 

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-columns">
          <div className="footer-col contact-info">
            <h3>Contact Us</h3>
            <p>Email: contact@bloompantry.com</p>
            <p>Phone: +92 300 1234567</p>
            <p>Address: 123 Orchard Lane, Jamville</p>
          </div>
          <div className="footer-col social-links">
            <h3>Follow Us</h3>
            <div className="footer-socials">
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-solid fa-envelope"></i></a>
            </div>
          </div>
        </div>
        <p className="footer-copy">© 2025 Bloom Pantry. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
