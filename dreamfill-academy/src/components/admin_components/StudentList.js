import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StudentList.css'
import EditForm from './EditForm'; // Import your edit form component
import { Row, Col, Button, Modal, Container, Form } from 'react-bootstrap';


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false); // State to trigger re-render
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [showLoginDetailsModal, setShowLoginDetailsModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        alert('An error occurred while fetching students.');
      });
  }, [updateFlag]); // Re-fetch students when updateFlag changes

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${studentId}`);
        // Remove the deleted student from the state
        setStudents(students.filter(student => student.id !== studentId));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };
  const handleFormSubmit = () => {
    setUpdateFlag(!updateFlag); // Toggle updateFlag to trigger re-render
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseLoginDetailModal = () => {
    setShowLoginDetailsModal(false);
    setShowNewPasswordInput(false);
    setNewPassword(''); // Reset the state when modal is closed
  };

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewLoginDetails = (student) => {
    setSelectedStudent(student);
    setShowLoginDetailsModal(true);
  };

  const handleSetNewPassword = async () => {
    if (newPassword.length < 5) {
      alert('New password must be at least 5 characters long.');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/students/pwd/${selectedStudent.id}`, { password: newPassword });
      setUpdateFlag(prevFlag => !prevFlag);
      setShowLoginDetailsModal(false);
      setShowNewPasswordInput(false);
      setNewPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className="student-list">
      <Container fluid>
      <Row className="heading">
      <Col xs={6}><h2>Enrolled Students</h2></Col>
      <Col xs={4}><Form className="search-form">
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </Form.Group>
      </Form></Col></Row></Container>
      
      <Container fluid>
        
      <Row className="border-bottom pb-3">
        <Col xs={4} sm={2}><strong>Name</strong></Col>
        <Col xs={4} sm={2}><strong>Email</strong></Col>
        <Col xs={2} sm={1}><strong>Batch</strong></Col>
        <Col xs={2} sm={1}><strong>Level</strong></Col>
        <Col xs={6} sm={1}><strong>Mobile</strong></Col>
        <Col xs={3} sm={1}><strong>Created At</strong></Col>
        
        <Col xs={6} sm={1}><strong>Action</strong></Col>
        <Col xs={6} sm={2}><strong>View Login Details</strong></Col>
      </Row>
      {filteredStudents.map(student => (
        <div key={student.id}>
          <Row className="border-bottom pb-3">
            <Col xs={4} sm={2}>{student.name}</Col>
            <Col xs={4} sm={2}>{student.email}</Col>
            <Col xs={2} sm={1}>{student.batch}</Col>
            <Col xs={2} sm={1}>{student.level}</Col>
            <Col xs={6} sm={1}>{student.mobileNumber}</Col>
            <Col xs={3} sm={1}>{new Date(student.createdAt).toLocaleDateString()}</Col>
            
            <Col xs={6} sm={1}>
              <Button variant="primary" onClick={() => handleEdit(student)}>Edit</Button>{' '}
              {/* <Button variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button> */}
            </Col>
            <Col xs={6} sm={2}>
                <Button variant="info" onClick={() => handleViewLoginDetails(student)}>View</Button>
              </Col>
          </Row>
        </div>
      ))}
    </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && <EditForm student={selectedStudent} onClose={handleCloseModal} onSubmit={handleFormSubmit}/>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      
      <Modal show={showLoginDetailsModal} onHide={handleCloseLoginDetailModal}>
        <Modal.Header>
          <Modal.Title>Login Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <>
              <p><strong>User ID:</strong> {selectedStudent.userId}</p>
              <p><strong>Password:</strong> {selectedStudent.password}</p>
              {!showNewPasswordInput && (
                <p><a href="#" onClick={() => setShowNewPasswordInput(true)}>Set New Password</a></p>
              )}
              {showNewPasswordInput && (
                <Form.Group controlId="newPassword">
                  <Form.Label>New Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLoginDetailModal}>Close</Button>
          {showNewPasswordInput && (
            <Button variant="primary" onClick={handleSetNewPassword}>Set New Password</Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentList;
