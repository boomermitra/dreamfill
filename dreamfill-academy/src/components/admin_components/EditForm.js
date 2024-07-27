import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles/EditForm.css'

const EditForm = ({ student, onClose, onSubmit  }) => {
  const [formData, setFormData] = useState(student);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/students/${formData.id}`, formData);
      await onSubmit(formData);
      onClose();
      
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

 

  //console.log(formData);

  return (
    <div className="edit-form">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="batch">Batch:</label>
          <input
            id="batch"
            type="text"
            name="batch"
            value={formData.batch || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="level">Level:</label>
          <input
            id="level"
            type="text"
            name="level"
            value={formData.level || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile:</label>
          <input
            id="mobileNumber"
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
