// Import Axios and any other necessary dependencies
const axios = require('axios');

// User credentials
const credentials = {
    username: 'admin', // or student username
    password: 'pass123' // or student password
  };
  
  // Login endpoint
  const loginUrl = 'http://localhost:5000/api/login';
  
  // Make a POST request to login and obtain session token or cookie
  axios.post(loginUrl, credentials, { withCredentials: true })
    .then(response => {
      console.log("Login Response:", response.data);
      
      // Once logged in, make authenticated requests to admin and student routes
      testAdminRoute();
      testStudentRoute();
    })
    .catch(error => {
      console.error("Login Error:", error.response.data);
    });
  
  // Function to test the Admin route
  const testAdminRoute = () => {
    axios.get('http://localhost:5000/api/admin', { withCredentials: true })
      .then(response => {
        console.log("Admin Response:", response.data);
      })
      .catch(error => {
        console.error("Admin Error:", error.response.data);
      });
  };
  
  // Function to test the Student route
  const testStudentRoute = () => {
    axios.get('http://localhost:5000/api/students', { withCredentials: true })
      .then(response => {
        console.log("Student Response:", response.data);
      })
      .catch(error => {
        console.error("Student Error:", error.response.data);
      });
  };