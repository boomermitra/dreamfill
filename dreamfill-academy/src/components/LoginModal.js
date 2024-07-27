//LoginModal.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import './styles/LoginModal.css'; // Import CSS file for modal styles
import Button from 'react-bootstrap/Button';

const LoginModal = ({ onLogin, navigate, closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onLogin function with username and password
    onLogin(username, password, navigate);
    // Close the modal after submitting the form
    setModalIsOpen(false);
    closeModal();
  };

  return (
    <div>
      {/* <Button onClick={() => setModalIsOpen(true)} variant="success">Login</Button> */}
      <Modal
        isOpen={true}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </Modal>
    </div>
  );
};

export default LoginModal;
