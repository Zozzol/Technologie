import React from 'react';
import { Box } from '@mui/material';
import './LoanPageLibrarian.css'; // Import the new CSS file
import NavBarLibrarian from '../home-page-librarian/NavBarLibrarian';
import LoanListLibrarian from './LoanListLibrarian';

const LoanPageLibrarian: React.FC = () => {
  return (
    <>
      <NavBarLibrarian />
      <Box className="loanpage-lib-wrapper">
        <LoanListLibrarian />
      </Box>
    </>
  );
};

export default LoanPageLibrarian;
