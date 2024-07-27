import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StudentSidebar from './StudentSidebar';
import ViewYourScore from './ViewYourScore';
import CompareYourScore from './CompareYourScore';

const StudentDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('enrolledStudents');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
        <h1 className="text-center mb-4">
          Student Dashboard
          </h1>
          </Col>
          </Row>

      <Row>
        <Col md ={2}>          
          <StudentSidebar selectedOption={selectedOption} onOptionChange={handleOptionChange} />
        </Col>
        <Col md ={10}>
          {selectedOption === 'viewYourScore' && <ViewYourScore />}
          {selectedOption === 'compareYourRanking' && <CompareYourScore />}          
          {/* {selectedOption === 'assignPoints' && <AssignPoints />}
          {selectedOption === 'adminReport' && <AdminReport />} */}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
