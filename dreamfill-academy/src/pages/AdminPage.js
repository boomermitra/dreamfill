import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from '../components/admin_components/AdminDashboard';

const AdminPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if the user is authenticated as admin by making a request to a protected admin endpoint
        await axios.get('http://localhost:5000/api/admin', { withCredentials: true });
        // If the request is successful, user is authenticated as admin
        setLoading(false);
      } catch (error) {
        // If the request fails (user is not authenticated as admin), redirect to login page
        navigate('/');
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Render AdminDashboard only if user is authenticated as admin */}
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
