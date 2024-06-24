import React from 'react';
import { Box, Typography } from '@mui/material';
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
