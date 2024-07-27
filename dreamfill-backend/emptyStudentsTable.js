// emptyStudentsTable.js

const Student = require('./models/Student');

const emptyStudentsTable = async () => {
  try {
    await Student.destroy({
      where: {},
      truncate: true // This option ensures that the table is truncated (emptied)
    });
    console.log('Students table emptied successfully.');
  } catch (error) {
    console.error('Error emptying students table:', error);
  }
};

emptyStudentsTable();
