import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentDashboard from '../components/student_components/StudentDashboard'; // Import your StudentDashboard component

const StudentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if the user is authenticated by making a request to a protected endpoint
        await axios.get('http://localhost:5000/api/studentslogin', { withCredentials: true });
        // If the request is successful, user is authenticated
        setLoading(false);
      } catch (error) {
        // If the request fails (user is not authenticated), redirect to login page
        navigate('/');
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Render StudentDashboard only if user is authenticated */}
      <StudentDashboard />
    </div>
  );
};

export default StudentPage;
