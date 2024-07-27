const PointsData = require('./models/PointsData');
const sequelize = require('./config/database'); 

async function createDummyEntry() {
  try {
     // Ensure that the database connection is established
     await sequelize.authenticate();
     console.log('Database connection established successfully.');

    const dummyEntry = await PointsData.create({
      date: '2024-03-13',
      studentId: 2,
      appPractice: 1,
      classwork: 2,
      homework: 3,
      oral: 4,
      mental: 3,
      worksheet: 3,
      activity: 3,
      punctuality: 3,
      dress: 4,
      totalPoints: 26
    });
    console.log('Dummy entry created:', dummyEntry.toJSON());
  } catch (error) {
    console.error('Error creating dummy entry:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

createDummyEntry();
