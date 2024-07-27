import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ selectedOption, onOptionChange }) => {
  return (
    <Nav className="flex-column">
      <Nav.Link
        className={selectedOption === 'enrollStudent' ? 'active' : ''}
        onClick={() => onOptionChange('enrollStudent')}
      >
        Enroll a Student
      </Nav.Link>
      <Nav.Link
        className={selectedOption === 'enrolledStudents' ? 'active' : ''}
        onClick={() => onOptionChange('enrolledStudents')}
      >
        Enrolled Students
      </Nav.Link>
      
      <Nav.Link
        className={selectedOption === 'assignPoints' ? 'active' : ''}
        onClick={() => onOptionChange('assignPoints')}
      >
        Assign Points
      </Nav.Link>

      <Nav.Link
        className={selectedOption === 'adminReport' ? 'active' : ''}
        onClick={() => onOptionChange('adminReport')}
      >
        Student Report
      </Nav.Link>

    </Nav>
  );
};

export default Sidebar;
