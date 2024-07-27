import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Batch:</label>
          <input type="text" name="batch" value={formData.batch} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Level:</label>
          <input type="text" name="level" value={formData.level} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input type="number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
        </div>
        <div className="form-buttons">
          <button type="submit">Submit</button>
          
        </div>
      </form>
    </div>
  );
};

export default EditForm;
