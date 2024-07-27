import React from 'react';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Courses from '../components/Courses';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Courses />
      <Contact />
      <Footer />     
    </div>
  );
}

export default HomePage;