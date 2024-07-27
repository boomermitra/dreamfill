import React from 'react';
import '../styles/About.css';
import classroomImage from '../images/classroom.jpg';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Us</h2>
        <p>Dreamfill Academy is dedicated to providing top-notch Abacus training to young minds. Our experienced instructors use innovative teaching methods to ensure that each student can reach their full potential.</p>
        <img src={classroomImage} alt="Classroom" className="about-image"/>
      </div>
    </section>
  );
};

export default About;
