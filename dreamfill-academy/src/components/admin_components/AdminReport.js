import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'; // Import the format function
import 'react-datepicker/dist/react-datepicker.css';
import { Container} from 'react-bootstrap';
import PointEditForm from './PointEditForm';

const AdminReport = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    // const [selectedLevel, setSelectedLevel] = useState('');
    const [pointsData, setPointsData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showPointEditForm, setShowPointEditForm] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState('');
  

    useEffect(() => {
      fetchPointsData();
    }, [selectedDate, selectedBatch]);

    const formatDate = (date) => {
      // Format the date to 'DD/MM/YYYY' format
      return format(date, 'dd-MM-yyyy');
    };

    const fetchPointsData = async () => {
      try {
        const formattedDate = formatDate(selectedDate);
        const endpoint = (selectedBatch === '') ? `http://localhost:5000/api/spoints/${formattedDate}` : `http://localhost:5000/api/spoints/${formattedDate}/${selectedBatch}`;
        const response = await axios.get(endpoint);
        setPointsData(response.data);
      } catch (error) {
        console.error('Error fetching points data:', error);
      }
    };

    const handleEdit = (data) => {
      setSelectedStudent(data);
      setShowPointEditForm(true);
    };

    const handleCloseEditForm = () => {
      setShowPointEditForm(false);
    };
   
    return (
      <div>
        <h2>Points Data Display</h2>
        <label>Select Date:</label>
        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
        <label>Select Batch:</label>
        <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}>
          <option value=''>All Batches</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          {/* Add more options for different levels */}
        </select>
        <Container fluid>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Batch</th>
                <th>Level</th>
                <th>App Practice</th>
                <th>Classwork</th>
                <th>Homework</th>
                <th>Oral</th>
                <th>Mental</th>
                <th>Worksheet</th>
                <th>Activity</th>
                <th>Punctuality</th>
                <th>Dress</th>
                <th>Total Points</th>
                <th>Actions</th> {/* Add column for edit button */}
              </tr>
            </thead>
            <tbody>
              {pointsData.map(data => (
                <tr key={data.id}>
                  <td>{data.Student.name}</td>
                  <td>{data.Student.batch}</td>
                  <td>{data.Student.level}</td>
                  <td>{data.appPractice}</td>
                  <td>{data.classwork}</td>
                  <td>{data.homework}</td>
                  <td>{data.oral}</td>
                  <td>{data.mental}</td>
                  <td>{data.worksheet}</td>
                  <td>{data.activity}</td>
                  <td>{data.punctuality}</td>
                  <td>{data.dress}</td>
                  <td>{data.totalPoints}</td>
                  <td>
                    <button onClick={() => handleEdit(data)}>Edit</button> {/* Edit button */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>

        {/* Render EditForm component */}
        {showPointEditForm && (
          <PointEditForm
            student={selectedStudent}
            onClose={handleCloseEditForm}
            fetchPointsData={fetchPointsData}
          />
        )}
       
      </div>
    );
};

export default AdminReport;
