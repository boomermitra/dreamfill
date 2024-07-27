// config/database.js
const { Sequelize } = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',      // Change this to your MySQL host
  username: 'root',  // Change this to your MySQL username
  password: '123456abc',  // Change this to your MySQL password
  database: 'dreamfill_academy'   // Change this to your MySQL database name
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the function to test the connection
testConnection();

module.exports = sequelize;
