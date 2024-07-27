// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const PointsData = require('../models/PointsData');

// Fetch enrolled students route
router.get('/', async (req, res) => {
  try {
    // Fetch all enrolled students from the database
    const students = await Student.findAll();
    res.status(200).json(students);
    console.log(res); // Respond with the list of enrolled students
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET route to fetch students by batch
router.get('/batch/:batch', async (req, res) => {
  try {
    const batch = req.params.batch;
    const students = await Student.findAll({
      where: {
        batch: batch // Filter students by batch
      }
    });
    res.json(students);
  } catch (error) {
    console.error('Error fetching students by batch:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for enrolling a student
router.post('/enroll', async (req, res) => {
  try {
          const { name, mobileNumber, email, batch, level, userId, password } = req.body;
          // Create a new student record in the database
          const student = await Student.create({
            name,
            mobileNumber,
            email,
            batch,
            level,
            userId,
            password
          });
          console.log(res);
          res.status(201).json(student); 
          console.log(res);// Respond with the enrolled student data
        } catch (error) {
          console.error('Error enrolling student:', error);
          res.status(500).json(req.body);
        }
      });

// Update student details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobileNumber, email, batch, level } = req.body;
    // Find the student by ID and update their details
    const updatedStudent = await Student.findByPk(id);
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    updatedStudent.name = name;
    updatedStudent.mobileNumber = mobileNumber;
    updatedStudent.email = email;
    updatedStudent.batch = batch;
    updatedStudent.level = level;
    await updatedStudent.save();
    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//update the password
router.put('/pwd/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const updatedStudent = await Student.findByPk(id);
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    updatedStudent.password = password;
    await updatedStudent.save();
    res.json(updatedStudent);
  }
  catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
);

// Delete a student
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Student.findByIdAndDelete(id);
//     res.json({ message: 'Student deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.delete('/:id', async (req, res) => { 
//   try {
//   const { id } = req.params;
//   // Find the student by id and delete it
//   await Student.destroy({ where: { id } });
//   res.sendStatus(204); // No content
// } catch (error) {
//   console.error('Error deleting student:', error);
//   res.status(500).json({ message: 'Internal Server Error' });
// }
// });




module.exports = router;
