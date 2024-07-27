// ViewYourScore.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const ViewYourScore = () => {
  const [pointsData, setPointsData] = useState([]);
  

  useEffect(() => {
    const fetchPointsData = async () => {
      try {
        // Add session information as headers
        const studentId = localStorage.getItem('StudendId');
        console.log(studentId);
        const response = await axios.get(`http://localhost:5000/api/spoints/viewyourscore/${studentId}`);
        setPointsData(response.data);
      } catch (error) {
        console.error('Error fetching points data:', error);
      }
    };

    fetchPointsData();
  }, []);

  return (
    <div className="view-your-score">
      <h2>View Your Score</h2>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
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
            {pointsData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.date}</TableCell>
                <TableCell>{data.appPractice}</TableCell>
                <TableCell>{data.classwork}</TableCell>
                <TableCell>{data.homework}</TableCell>
                <TableCell>{data.oral}</TableCell>
                <TableCell>{data.mental}</TableCell>
                <TableCell>{data.worksheet}</TableCell>
                <TableCell>{data.activity}</TableCell>
                <TableCell>{data.punctuality}</TableCell>
                <TableCell>{data.dress}</TableCell>
                <TableCell>{data.totalPoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewYourScore;