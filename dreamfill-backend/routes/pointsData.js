const express = require('express');
const router = express.Router();
const PointsData = require('../models/PointsData'); // Assuming you have a PointsData model
const Student = require('../models/Student');

// POST endpoint to receive points data
router.post('/', async (req, res) => {
  try {
    const pointsData = req.body; // Assuming the request body contains an array of points data objects
    console.log(pointsData);

    // Process each points data object
    await Promise.all(pointsData.map(async (data) => {
      // Check if there is existing data for the student on the same date
      const existingData = await PointsData.findOne({
        where: {
          date: data.date,
          studentId: data.studentId
        }
      });
      console.log('Existing points data:', existingData);

      if (existingData) {
        // Update existing data
        await PointsData.update(data, {
          where: {
            date: data.date,
            studentId: data.studentId
          }
        });
      } else {
        // Insert new data
        await PointsData.create(data);
      }
    }));

    res.status(201).json({ message: 'Points data inserted/updated successfully' });
  } catch (error) {
    console.error('Error inserting/updating points data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get Request From Student-side for Comparing Scores with Others
router.get('/compareyourscore/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    console.log('Received studentId:', studentId); // Log the received studentId

    // Fetch the student's data to get batch and level
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch points data for students in the same batch and level
    const pointsData = await PointsData.findAll({
      include: {
        model: Student,
        where: { batch: student.batch },
        attributes: ['name', 'batch', 'level']
      }
    });

    res.json(pointsData); // Send the points data as a response
  } catch (error) {
    console.error('Error fetching points data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Get Request From Student-side for Level-wise Points Data 
router.get('/comparelevelscore/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    console.log('Received studentId:', studentId); // Log the received studentId

    // Fetch the student's level
    const student = await Student.findOne({
      where: { id: studentId },
      attributes: ['level']
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const { level } = student;

    // Fetch points data for all students in the same level
    const pointsData = await PointsData.findAll({
      include: {
        model: Student,
        attributes: ['name', 'batch', 'level'],
        where: { level }
      }
    });

    res.json(pointsData); // Send the points data as a response
  } catch (error) {
    console.error('Error fetching points data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get Request From Student-side for Individual Student's Points Data 
router.get('/viewyourscore/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    console.log('Received studentId:', studentId); // Log the received studentId
    
    // Fetch points data for the specified student ID
    const pointsData = await PointsData.findAll({
      where: { studentId }
    });

    res.json(pointsData); // Send the points data as a response
  } catch (error) {
    console.error('Error fetching points data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// GET endpoint to fetch all student points data
router.get('/all', async (req, res) => {
  try {
    const studentPointsData = await PointsData.findAll();
    res.json(studentPointsData); // Send the student points data as a response
  } catch (error) {
    console.error('Error fetching student points data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET endpoint to fetch all student points data for a specific date
router.get('/:date', async (req, res) => {
  try {
    const dateWithHyphens = req.params.date;
    const date = dateWithHyphens.split('-').join('/');
    const studentPointsData = await PointsData.findAll({
      where: { date },
      include: {
        model: Student,
        attributes: ['name', 'batch', 'level'] // Include specific attributes from the Student table
      }
    });
    res.json(studentPointsData); // Send the student points data as a response
  } catch (error) {
    console.error('Error fetching student points data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET endpoint to fetch batch-wise student points data for a specific date
router.get('/:date/:batch', async (req, res) => {
  try {
    const dateWithHyphens = req.params.date;
    const date = dateWithHyphens.split('-').join('/');
    const batch = req.params.batch;

    const studentPointsData = await PointsData.findAll({
      where: { date },
      include: {
        model: Student,
        attributes: ['name', 'batch', 'level'],
        where: { batch }
      }
    });

    res.json(studentPointsData); // Send the student points data as a response
  } catch (error) {
    console.error('Error fetching student points data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT endpoint to update points data for a specific student and date
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPoints = req.body;

    // Update points data in the database
    await PointsData.update(updatedPoints, {
      where: { studentId: id, date: updatedPoints.date }
    });

    res.status(200).json({ message: 'Points data updated successfully' });
  } catch (error) {
    console.error('Error updating points data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
