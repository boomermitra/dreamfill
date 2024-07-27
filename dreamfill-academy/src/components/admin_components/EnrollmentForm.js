import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const EnrollmentForm = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('');
  const [level, setLevel] = useState('');
  const [userId, setuserId] = useState('');
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
        setuserId('');
        setPassword('');
      })
      .catch((error) => {
        console.error('Enrollment error:', error);
        alert('An error occurred. Please try again later.');
      });
  };

  const generateUserIDAndPassword = () => {
    // Generate userID based on name and mobile number
    const firstName = name.split(' ')[0];
    const mobileDigits = mobileNumber.slice(0, 4);
    const generatedUserID = `${firstName}${mobileDigits}`;
    setuserId(generatedUserID);

    // Generate random 4-digit password
    const generatedPassword =
      firstName.slice(0, 3) + Math.floor(Math.random() * 10000);
    setPassword(generatedPassword);
  };

  return (
    <Container>
      <h2>Enroll A Student</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
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

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalEmail"
        >
          <Form.Label column sm={2}>
            Email
          </Form.Label>
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

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalMobile"
        >
          <Form.Label column sm={2}>
            Mobile
          </Form.Label>
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
          <Form.Label column sm={2}>
            Batch
          </Form.Label>
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
          <Form.Label column sm={2}>
            Level
          </Form.Label>
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

        {userId === '' && password === '' ? (
          <Button onClick={generateUserIDAndPassword}>
            Generate UserID and Password
          </Button>
        ) : (
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              UserID
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="text"
                required
                placeholder="userId"
                value={userId}
                onChange={(e) => setuserId(e.target.value)}
              />
            </Col>
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="text"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>
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
