// sync.js

const sequelize = require('sequelize'); // Assuming you have a sequelize.js file
const PointsData = require('./models/PointsData'); // Assuming you have a PointsData model

(async () => {
  try {
    // Sync the PointsData model with the database
    await PointsData.sync({ force: true }); // Use { force: true } , { alter: true } if you want to drop the existing table and recreate it

    console.log('PointsData table synced successfully');
  } catch (error) {
    console.error('Error syncing PointsData table:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
})();
