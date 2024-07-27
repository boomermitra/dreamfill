const PointsData = require('./models/PointsData');

async function emptyPointsDataTable() {
  try {
    // Delete all records from the PointsData table
    await PointsData.destroy({
      where: {}, // Pass an empty object to delete all records
      truncate: true // Truncate ensures that auto-increment primary keys are reset
    });

    // Confirmation message
    console.log('PointsData table has been emptied.');
  } catch (error) {
    console.error('Error emptying PointsData table:', error);
  }
}

// Call the function to empty the table
emptyPointsDataTable();
