import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const EnrollmentForm = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('');
  const [level, setLevel] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/students/enroll', {
        name,
        mobileNumber,
        email,
        batch,
        level,
        userId,
        password,
      })
      .then((response) => {
        // Handle successful enrollment
        alert('Student enrolled successfully!');
        // Clear form fields
        setName('');
        setMobileNumber('');
        setEmail('');
        setBatch('');
        setLevel('');
        setUserId('');
        setPassword('');
      })
      .catch((error) => {
        console.error('Enrollment error:', error);
        alert('An error occurred. Please try again later.');
      });
  };

  const generateUserIDAndPassword = () => {
    // Generate userID based on name and mobile number
    if (name && mobileNumber) {
      const firstName = name.split(' ')[0];
      const mobileDigits = mobileNumber.slice(-4);
      const generatedUserID = `${firstName}${mobileDigits}`;
      setUserId(generatedUserID);

      // Generate random 4-digit password
      const generatedPassword =
        firstName.slice(0, 3) + Math.floor(1000 + Math.random() * 9000);
      setPassword(generatedPassword);
    } else {
      alert('Please enter name and mobile number to generate username and password.');
    }
  };

  return (
    <Container>
      <h2>Enroll A Student</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Col sm={5}>
            <Form.Control
              type="text"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Col sm={5}>
            <Form.Control
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalMobile">
          <Col sm={5}>
            <Form.Control
              type="text"
              required
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalBatch">
          <Col sm={5}>
            <Form.Control
              type="text"
              required
              placeholder="Batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalLevel">
          <Col sm={5}>
            <Form.Control
              type="text"
              required
              placeholder="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button onClick={generateUserIDAndPassword} className="mb-3">
          Generate UserID and Password
        </Button>

        {userId && password && (
          <>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                UserID
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  placeholder="UserID"
                  value={userId}
                  readOnly
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  placeholder="Password"
                  value={password}
                  readOnly
                />
              </Col>
            </Form.Group>
          </>
        )}

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 4 }}>
            <Button type="submit">Submit</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default EnrollmentForm;
