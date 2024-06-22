import React from 'react';
import { Box, Typography } from '@mui/material';
import './HomePageReader.css';
import NavBarReader from './NavBarReader';

const HomePageReader: React.FC = () => {
  return (
    <Box className="home-page-read-wrapper">
      <NavBarReader />
    </Box>
  );
};

export default HomePageReader;
