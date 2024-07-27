// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const cors = require('cors'); 
const Student = require('./models/Student'); 
const app = express();
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const pointsDataRouter = require('./routes/pointsData');
const studentRouter = require('./routes/students');
const { adminAuthMiddleware, studentAuthMiddleware } = require('./authMiddleware');

const crypto = require('crypto');

// Generate a random secret key of 32 bytes (256 bits)
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

// Session middleware
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false
}));

// Add console log to check session
app.use((req, res, next) => {
    console.log("Session:", req.session);
    next();
  });

// Body parser middleware
app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // Allow credentials
  };
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/api/admin', adminAuthMiddleware, (req, res) => {
    // This code will only execute if the user is authenticated as an admin
    res.status(200).json({ message: 'Admin authenticated' });
  });

app.get('/api/studentslogin', studentAuthMiddleware, (req, res) => {
    // This code will only execute if the user is authenticated as an admin
    res.status(200).json({ message: 'Student authenticated' });
  });
  
app.use('/api/admin', adminAuthMiddleware); // Apply admin authentication middleware to admin routes
app.use('/api/studentslogin', studentAuthMiddleware); // Apply student authentication middleware to student routes

// Define routes



app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
      let user = null;
      // Check if the user is the admin
      if (username === 'admin' && password === 'pass123') {          
        // Set admin user in session
        req.session.user = {username: 'admin',
                          password: 'pass123'};
        return res.json({ username: 'admin',
                          password: 'pass123' });
      } else {
          // Query the student table to find a matching user
          user = await Student.findOne({
              where: {
                  userId: username,
                  password: password
              }
          });
      }
      if (user) {
            // Set student user in session
            req.session.user = { username: user.userId, password: user.password, name: user.name, studentId: user.id };
            return res.json({ username: user.userId, password: user.password, name: user.name, studentId: user.id });
      } else {
          return res.json({ success: false });
      }
  } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ success: false, error: 'An error occurred while logging in' });
  }
});


app.use('/api/users', require('./routes/users'));
app.use('/api/students', studentRouter);
app.use('/api/spoints', pointsDataRouter);

// Sync models with the database
sequelize.sync({ force: false }) // Adjust force option as needed
    .then(() => {
        console.log('Database synchronized successfully');
        // Start server after synchronizing models
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });
