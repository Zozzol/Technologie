import React from 'react';
import { Box } from '@mui/material';
import NavBarReader from '../home-page-reader/NavBarReader';
import './MyLoansPage.css';
import MyLoansList from './MyLoansList';

const MyLoansPage: React.FC = () => {
  return (
    <>
      <NavBarReader />
      <Box className="myloans-page-wrapper">
        <MyLoansList />
      </Box>
    </>
  );
};

export default MyLoansPage;
