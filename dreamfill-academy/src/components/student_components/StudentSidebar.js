import React from 'react';
import { Nav } from 'react-bootstrap';

const StudentSidebar = ({ selectedOption, onOptionChange }) => {
  return (
    <Nav className="flex-column">
      <Nav.Link
        className={selectedOption === 'viewYourScore' ? 'active' : ''}
        onClick={() => onOptionChange('viewYourScore')}
      >
        View Your Score
      </Nav.Link>
      <Nav.Link
        className={selectedOption === 'compareYourRanking' ? 'active' : ''}
        onClick={() => onOptionChange('compareYourRanking')}
      >
        Compare Your Ranking
      </Nav.Link>
      
      <Nav.Link
        className={selectedOption === 'redeemYourPoints' ? 'active' : ''}
        onClick={() => onOptionChange('redeemYourPoints')}
      >
        Redeem Your Points
      </Nav.Link>

      <Nav.Link
        className={selectedOption === 'redemptionHistory' ? 'active' : ''}
        onClick={() => onOptionChange('adminReport')}
      >
        Redemption History
      </Nav.Link>

    </Nav>
  );
};

export default StudentSidebar;
