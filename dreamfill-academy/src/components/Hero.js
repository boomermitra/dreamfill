import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-text">
          <h1>Welcome To Dreamfill Academy</h1>
          <h2>Unlock Your Child's Analytical Capabilities</h2>
          <p>Join Dreamfill Academy to enhance your child's learning through expert Abacus training.</p>
          <a href="#courses" className="btn">Explore Our Courses</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
