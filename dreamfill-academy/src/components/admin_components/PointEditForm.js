import React, { useState } from 'react';
import axios from 'axios';
import './Styles/PointEditForm.css';


const PointEditForm = ({ student, onClose, fetchPointsData }) => {
  const [editedPoints, setEditedPoints] = useState({ ...student });

  // Function to calculate total points
  const calculateTotalPoints = () => {
    const {
      appPractice,
      classwork,
      homework,
      oral,
      mental,
      worksheet,
      activity,
      punctuality,
      dress
    } = editedPoints;

    const totalPoints = [
      parseInt(appPractice),
      parseInt(classwork),
      parseInt(homework),
      parseInt(oral),
      parseInt(mental),
      parseInt(worksheet),
      parseInt(activity),
      parseInt(punctuality),
      parseInt(dress)
    ].reduce((total, currentValue) => total + (isNaN(currentValue) ? 0 : currentValue), 0);

    return totalPoints;
  };

  // Function to handle input field changes
  const handleInputChange = (e, field) => {
    setEditedPoints({
      ...editedPoints,
      [field]: parseInt(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      // Calculate total points before submitting
      const totalPoints = calculateTotalPoints();
      // Add total points to the edited points object
      const editedPointsWithTotal = { ...editedPoints, totalPoints };
      
      // console.log('edited data: ', editedPointsWithTotal);
      // console.log('student prop: ', student);
      
      // Send edited points data to the backend to update the database
      await axios.put(`http://localhost:5000/api/spoints/${student.studentId}`, editedPointsWithTotal);
      // Close the edit form
      onClose();
      // Refetch points data after submitting edits
      fetchPointsData();
    } catch (error) {
      console.error('Error updating points data:', error);
    }
  };

  return (
    <div className="edit-form-overlay">
    <div className="edit-form">
      <button className="close-button" onClick={onClose}>X</button>
      <h3>Edit Points of {student.Student.name} for {student.date}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="appPractice">App Practice</label>
            <input type="text" id="appPractice" defaultValue={student.appPractice} onChange={(e) => handleInputChange(e, 'appPractice')} />
          </div>
          {/* Add more input fields for other points data */}

          <div className="form-group">
            <label htmlFor="classwork">Classwork</label>
            <input type="text" id="classwork" defaultValue={student.classwork} onChange={(e) => handleInputChange(e, 'classwork')} />
          </div>

          <div className="form-group">
            <label htmlFor="homework">Homework</label>
            <input type="text" id="homework" defaultValue={student.homework} onChange={(e) => handleInputChange(e, 'homework')} />
          </div>

          <div className="form-group">
            <label htmlFor="oral">Oral</label>
            <input type="text" id="oral" defaultValue={student.oral} onChange={(e) => handleInputChange(e, 'oral')} />
          </div>

          <div className="form-group">
            <label htmlFor="mental">Mental</label>
            <input type="text" id="mental" defaultValue={student.mental} onChange={(e) => handleInputChange(e, 'mental')} />
          </div>

          <div className="form-group">
            <label htmlFor="worksheet">Worksheet</label>
            <input type="text" id="worksheet" defaultValue={student.worksheet} onChange={(e) => handleInputChange(e, 'worksheet')} />
          </div>

          <div className="form-group">
            <label htmlFor="activity">Activity</label>
            <input type="text" id="activity" defaultValue={student.activity} onChange={(e) => handleInputChange(e, 'activity')} />
          </div>

          <div className="form-group">
            <label htmlFor="punctuality">Punctuality</label>
            <input type="text" id="punctuality" defaultValue={student.punctuality} onChange={(e) => handleInputChange(e, 'punctuality')} />
          </div>

          <div className="form-group">
            <label htmlFor="dress">Dress</label>
            <input type="text" id="dress" defaultValue={student.dress} onChange={(e) => handleInputChange(e, 'dress')} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="totalPoints">Total Points:</label>
              <input type="text" id="totalPoints" value={calculateTotalPoints()} readOnly />
            </div>
          </div>

        </div>
        <div className="form-row">
          <div className="form-group">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  );
};

export default PointEditForm;
