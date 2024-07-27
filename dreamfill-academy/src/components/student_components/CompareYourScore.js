import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, FormControlLabel, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { format, parse } from 'date-fns';
import './CompareYourScore.css'; // Create a CSS file for custom styles

const CompareYourScore = () => {
  const [viewOption, setViewOption] = useState('batch');
  const [pointsData, setPointsData] = useState([]);
  const [loggedInStudentId, setLoggedInStudentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const containersPerPage = 2;
  
  useEffect(() => {
    const fetchPointsData = async () => {
      try {
        const studentId = localStorage.getItem('StudendId');
        setLoggedInStudentId(studentId);
        let response;
        if (viewOption === 'batch') {
          response = await axios.get(`http://localhost:5000/api/spoints/compareyourscore/${studentId}`);
        } else {
          response = await axios.get(`http://localhost:5000/api/spoints/comparelevelscore/${studentId}`);
        }
        setPointsData(response.data);
      } catch (error) {
        console.error('Error fetching points data:', error);
      }
    };
  
    fetchPointsData();
  }, [viewOption]);
  

  const handleViewOptionChange = (event) => {
    setViewOption(event.target.value);
  };

  const getRankedData = () => {
    // Group data by date
    const groupedData = pointsData.reduce((acc, data) => {
      const date = format(parse(data.date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(data);
      return acc;
    }, {});

    // Sort groups by date in descending order and rank within each group
    const rankedData = Object.entries(groupedData).sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
      .map(([date, students]) => {
        const ranked = students.sort((a, b) => b.totalPoints - a.totalPoints).map((student, index) => ({
          ...student,
          rank: index + 1,
          formattedDate: date
        }));
        return { date, ranked };
      });

    return rankedData;
  };

  const rankedData = getRankedData();

  // Pagination logic
  const indexOfLastContainer = currentPage * containersPerPage;
  const indexOfFirstContainer = indexOfLastContainer - containersPerPage;
  const currentContainers = rankedData.slice(indexOfFirstContainer, indexOfLastContainer);

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(rankedData.length / containersPerPage);
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button key={i} onClick={() => setCurrentPage(i)} variant={i === currentPage ? "contained" : "outlined"}>
          {i}
        </Button>
      );
    }
    return buttons;
  };

  const renderRankingData = () => {
    return currentContainers.map(({ date, ranked }) => (
      <div key={date} className="rank-container">
        <h3>Ranking for {format(new Date(date), 'dd/MM/yyyy')}</h3>
        <TableContainer component={Paper} className="rank-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>batch</TableCell>
                <TableCell>level</TableCell>
                <TableCell>Total Points</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {ranked.map((data) => (
                <TableRow key={data.id} style={{ backgroundColor: `${data.studentId}` === `${loggedInStudentId}` ? '#ffff99' : 'inherit' }}>
                  <TableCell>{data.rank}</TableCell>
                  <TableCell>{data.Student.name}</TableCell>
                  <TableCell>{data.Student.batch}</TableCell>
                  <TableCell>{data.Student.level}</TableCell>
                  <TableCell>{data.totalPoints}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    ));
  };

  return (
    <div className="compare-your-score">
      <h2>Compare Your Score</h2>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="view-option"
          name="view-option"
          value={viewOption}
          onChange={handleViewOptionChange}
        >
          <FormControlLabel value="batch" control={<Radio />} label="Batch-Wise" />
          <FormControlLabel value="level" control={<Radio />} label="Level-Wise" />
        </RadioGroup>
      </FormControl>

      {viewOption === 'batch' && (
        <div>
          {renderRankingData()}
          <div className="pagination-buttons">
            {renderPaginationButtons()}
          </div>
        </div>
      )}

      {viewOption === 'level' && (
        <div>
          {renderRankingData()}
          <div className="pagination-buttons">
            {renderPaginationButtons()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareYourScore;
