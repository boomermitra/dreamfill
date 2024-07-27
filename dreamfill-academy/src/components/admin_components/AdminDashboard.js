import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import StudentList from './StudentList';
import EnrollmentForm from './EnrollmentForm';
import AssignPoints from './AssignPoints';
import AdminReport from './AdminReport';

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('enrolledStudents');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
        <h1 className="text-center mb-4">
          Admin Dashboard
          </h1>
          </Col>
          </Row>

      <Row>
        <Col md ={2}>          
          <Sidebar selectedOption={selectedOption} onOptionChange={handleOptionChange} />
        </Col>
        <Col md ={10}>
          {selectedOption === 'enrollStudent' && <EnrollmentForm />}
          {selectedOption === 'enrolledStudents' && <StudentList />}          
          {selectedOption === 'assignPoints' && <AssignPoints />}
          {selectedOption === 'adminReport' && <AdminReport />}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
