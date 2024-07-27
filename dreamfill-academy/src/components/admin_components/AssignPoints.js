import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const AssignPoints = () => {
  const [students, setStudents] = useState([]);
  const [pointsData, setPointsData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBatch, setSelectedBatch] = useState('');
  const [sortingOptions, setSortingOptions] = useState({ batch: null, level: null });

  useEffect(() => {
    fetchStudents(selectedBatch);
  }, [selectedBatch, selectedDate]);

  const fetchStudents = async (batch) => {
    try {
      const endpoint = (batch === '') ? 'http://localhost:5000/api/students' : `http://localhost:5000/api/students/batch/${batch}`;
      const response = await axios.get(endpoint);
      const studentData = response.data;
      setStudents(studentData);

      const formattedDate = format(selectedDate, 'dd-MM-yyyy');
      console.log(formattedDate);
      const pointsResponse = await axios.get(`http://localhost:5000/api/spoints/${formattedDate}`);
      const fetchedPointsData = {};
      pointsResponse.data.forEach(point => {
        fetchedPointsData[point.studentId] = point;
      });
      setPointsData(fetchedPointsData);
    } catch (error) {
      console.error('Error fetching students or points data:', error);
    }
  };

  const handlePointsChange = (studentId, criterion, value) => {
    const updatedPointsData = { ...pointsData };
    if (!updatedPointsData[studentId]) {
      updatedPointsData[studentId] = {
        appPractice: 0,
        classwork: 0,
        homework: 0,
        oral: 0,
        mental: 0,
        worksheet: 0,
        activity: 0,
        punctuality: 0,
        dress: 0,
        totalPoints: 0,
        studentId: studentId
      };
    }

    updatedPointsData[studentId][criterion] = parseInt(value) || 0;

    // Recalculate total points
    const totalPoints = ['appPractice', 'classwork', 'homework', 'oral', 'mental', 'worksheet', 'activity', 'punctuality', 'dress']
      .reduce((acc, key) => acc + updatedPointsData[studentId][key], 0);

    updatedPointsData[studentId].totalPoints = totalPoints;
    setPointsData(updatedPointsData);

    console.log("Updated points data after total calculation: ", updatedPointsData);
  };

  const handleAssignPoints = async () => {
    try {
      const formattedDate = format(selectedDate, 'dd/MM/yyyy');
      const dataToSend = Object.values(pointsData).map(point => ({
        date: formattedDate,
        studentId: point.studentId,
        ...point
      }));

      await axios.post('http://localhost:5000/api/spoints', dataToSend);
      console.log("Data sent to server: ", dataToSend);
      alert('Points assigned successfully!');
    } catch (error) {
      console.error('Error assigning points:', error);
      alert('An error occurred while assigning points.');
    }
  };

  const handleSortByBatch = () => {
    const newStudents = [...students];
    newStudents.sort((a, b) => sortingOptions.batch === 'asc' ? a.batch.localeCompare(b.batch) : b.batch.localeCompare(a.batch));
    setStudents(newStudents);
    setSortingOptions({ ...sortingOptions, batch: sortingOptions.batch === 'asc' ? 'desc' : 'asc' });
  };

  const handleSortByLevel = () => {
    const newStudents = [...students];
    newStudents.sort((a, b) => sortingOptions.level === 'asc' ? a.level.localeCompare(b.level) : b.level.localeCompare(a.level));
    setStudents(newStudents);
    setSortingOptions({ ...sortingOptions, level: sortingOptions.level === 'asc' ? 'desc' : 'asc' });
  };

  return (
    <div>
      <h2>Assign Points</h2>
      <label>Select Date:</label>
      <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
      <label>Select Batch:</label>
      <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
        <option value="">All Batches</option>
        <option value="A">Batch A</option>
        <option value="B">Batch B</option>
        <option value="C">Batch C</option>
      </select>
      <Container>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Batch <button onClick={handleSortByBatch}>
                  {sortingOptions.batch === 'asc' ? <i className="bi bi-sort-up" style={{ fontSize: '1rem', color: 'cornflowerblue' }}></i> : <i className="bi bi-sort-down-alt" style={{ fontSize: '1rem', color: '#fc3903' }}></i>}
                </button></TableCell>
                <TableCell>Level <button onClick={handleSortByLevel}>
                  {sortingOptions.level === 'asc' ? <i className="bi bi-sort-up" style={{ fontSize: '1.1rem', color: 'cornflowerblue' }}></i> : <i className="bi bi-sort-down-alt" style={{ fontSize: '1.1rem', color: '#fc3903' }}></i>}
                </button></TableCell>
                <TableCell>App Practice</TableCell>
                <TableCell>Classwork</TableCell>
                <TableCell>Homework</TableCell>
                <TableCell>Oral</TableCell>
                <TableCell>Mental</TableCell>
                <TableCell>Worksheet</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Punctuality</TableCell>
                <TableCell>Dress</TableCell>
                <TableCell>Total Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.batch}</TableCell>
                  <TableCell>{student.level}</TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={pointsData[student.id]?.appPractice || ''}
                      onChange={e => handlePointsChange(student.id, 'appPractice', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={pointsData[student.id]?.classwork || ''}
                      onChange={e => handlePointsChange(student.id, 'classwork', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={pointsData[student.id]?.homework || ''}
                      onChange={e => handlePointsChange(student.id, 'homework', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={pointsData[student.id]?.oral || ''}
                      onChange={e => handlePointsChange(student.id, 'oral', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={pointsData[student.id]?.mental || ''}
                      onChange={e => handlePointsChange(student.id, 'mental', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={pointsData[student.id]?.worksheet || ''}
                      onChange={e => handlePointsChange(student.id, 'worksheet', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={pointsData[student.id]?.activity || ''}
                      onChange={e => handlePointsChange(student.id, 'activity', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={pointsData[student.id]?.punctuality || ''}
                      onChange={e => handlePointsChange(student.id, 'punctuality', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={pointsData[student.id]?.dress || ''}
                      onChange={e => handlePointsChange(student.id, 'dress', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={pointsData[student.id]?.totalPoints || ''}
                      disabled
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Button variant="contained" onClick={handleAssignPoints}>Submit</Button>
    </div>
  );
};

export default AssignPoints;
