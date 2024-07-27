import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Navbar1 = ({ isLoggedIn, username, onLogout, onLogin }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    

    if (userLoggedIn && storedUsername) {
      onLogin(storedUsername, storedPassword) // Auto-login if user was logged in before
    }
  }, []); // Run only once on component mount

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Dreamfill Academy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About us</Nav.Link>
            <Nav.Link href="/courses">Courses</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          {isLoggedIn ? (
            <>
              <div style={{ color: 'white', paddingLeft: '20px', paddingRight: '20px' }}>Welcome, {username}</div>
              <button className="btn btn-danger" onClick={handleLogoutClick}>Logout</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleLoginClick}>Login</button>
          )}
        </Navbar.Collapse>
      </Container>
      {showModal && <LoginModal closeModal={() => setShowModal(false)} onLogin={onLogin} />}
    </Navbar>
  );
};

export default Navbar1;
