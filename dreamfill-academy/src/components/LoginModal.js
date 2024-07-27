// LoginModal.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/LoginModal.css';

const LoginModal = ({ onLogin, navigate, closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onLogin function with username and password
    onLogin(username, password, navigate);
    // Close the modal after submitting the form
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          
          <input
            type="text"
            id="username"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          
          <input
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </Modal>
  );
};

export default LoginModal;
