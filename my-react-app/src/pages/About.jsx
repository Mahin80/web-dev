import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import '../styles/about.css';

import stgarden from '../assets/images/stgarden.png';
import jams from '../assets/images/jams.jpeg';
import stplate from '../assets/images/stplate.png';

const About = () => {
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userLink = document.getElementById('userIconLink');
    if (userLink) {
      userLink.setAttribute('href', token ? '/account' : '/signup');
    }
  }, []);

  return (
    <>
      <Header onCartClick={() => setShowCart(true)} />
      <CartSidebar open={showCart} onClose={() => setShowCart(false)} />

      <header className="about-header">
        <h1>About Us</h1>
      </header>

      <section className="brand-story">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            Bloom Pantry began as a weekend passion project. A handful of handpicked berries, a beloved family recipe,
            and the dream of sharing homemade goodness with the world. Today, our team continues that tradition —
            crafting honest food with the same love and care as the very first jar.
          </p>
          <p>
            From farmers' markets to online shelves, our journey is one of flavor, friendship, and community. We invite
            you to be part of our story and share the sweetness.
          </p>
        </div>
        <div className="story-image">
          <img src={stgarden} alt="Bloom Pantry Founders" />
        </div>
      </section>

      <section className="break-banner">
        <div className="break-text">
          <h2>From Our Garden to Your Table</h2>
        </div>
      </section>

      <section className="about-intro">
        <div className="about-text">
          <h2>Rooted in Nature, Made with Heart</h2>
          <p>
            At <strong>Bloom Pantry</strong>, we believe that the best things in life are simple, pure, and made by
            hand. What started in a small countryside kitchen is now a growing pantry of homemade jams, marmalades, and
            natural mixes — all made with real fruits, no preservatives, and lots of love.
          </p>
          <p>
            Our mission is to bring the flavors of the season straight to your table. Whether it’s a spoonful of wild
            strawberry jam or a jar of citrus marmalade, each product is thoughtfully prepared in small batches to
            preserve freshness, flavor, and authenticity.
          </p>
        </div>
        <div className="about-img">
          <img src={jams} alt="Our Pantry Kitchen" />
        </div>
      </section>

      <section className="values">
        <h2>What We Value</h2>
        <div className="value-cards">
          <div className="card">
            <h3>Handcrafted</h3>
            <p>Every jar is made with attention to detail, using traditional methods and real ingredients.</p>
          </div>
          <div className="card">
            <h3>Seasonal & Local</h3>
            <p>We source fruits from trusted local farms, supporting sustainability and peak freshness.</p>
          </div>
          <div className="card">
            <h3>Simple Ingredients</h3>
            <p>No additives. No shortcuts. Just real fruit, natural sugars, and time-honored recipes.</p>
          </div>
        </div>
      </section>

      <section className="pics">
        <img src={stplate} alt="Assorted fresh fruits arranged on a white plate" />
      </section>

      <Footer />
    </>
  );
};

export default About;
