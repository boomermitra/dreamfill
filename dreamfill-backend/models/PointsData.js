const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./Student');

const PointsData = sequelize.define('PointsData', {
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'id'
    }
  },
  appPractice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  classwork: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  homework: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  oral: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  mental: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  worksheet: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  activity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  punctuality: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  dress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  totalPoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

// Define associations
PointsData.belongsTo(Student, { foreignKey: 'studentId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = PointsData;
