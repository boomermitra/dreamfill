import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import StudentPage from './pages/StudentPage';
import Navbar1 from './components/Navbar';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        { username, password },
        { withCredentials: true }
      );
      const userData = response.data;    

      setIsLoggedIn(true);
      setUsername(username);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('StudendId', userData.studentId);
      
      navigate(userData.username === 'admin' ? '/admin' : '/student');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('StudendId');
    
    navigate('/');
  };

  return (
    <>
      <Navbar1 isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} onLogin={handleLogin}/>
      {error && <div className="error">{error}</div>}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/student' element={<StudentPage />} />
      </Routes>
    </>
  );
}

export default App;
