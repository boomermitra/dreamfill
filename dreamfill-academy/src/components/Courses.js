import React from 'react';
import '../styles/Courses.css';
import course1Image from '../images/course1.jpg';
import course2Image from '../images/course2.jpg';
import course3Image from '../images/course3.jpg';

const Courses = () => {
  return (
    <section id="courses" className="courses">
      <div className="container">
        <h2>Our Courses</h2>
        <div className="course-grid">
          <div className="course-item">
            <img src={course1Image} alt="Course 1" className="course-image"/>
            <h3>Beginner Level</h3>
            <p>Introduce your child to the basics of Abacus and fundamental mathematical concepts.</p>
          </div>
          <div className="course-item">
            <img src={course2Image} alt="Course 2" className="course-image"/>
            <h3>Intermediate Level</h3>
            <p>Build on existing skills and introduce more complex calculations and techniques.</p>
          </div>
          <div className="course-item">
            <img src={course3Image} alt="Course 3" className="course-image"/>
            <h3>Advanced Level</h3>
            <p>Master the Abacus with advanced techniques and rapid calculation methods.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;