// createDummyStudent.js
const sequelize = require('./config/database'); // Assuming your database configuration is in this file
const Student = require('./models/Student'); // Assuming your Student model is defined in this file

async function createDummyStudent() {
  try {
    // Ensure that the database connection is established
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Generate userId and password
    const userId = 'Dummy1234';
    const password = 'Dumm789';

    // Create a dummy student record
    const dummyStudent = await Student.create({
      name: 'Dummy Student',
      mobileNumber: '1234567890',
      email: 'dummy@example.com',
      batch: 'Batch A',
      level: 'Intermediate',
      userId: userId,
      password: password
    });
    console.log('Dummy student created:', dummyStudent.toJSON());
  } catch (error) {
    console.error('Error creating dummy student:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
    console.log('Database connection closed.');
  }
}


createDummyStudent();
