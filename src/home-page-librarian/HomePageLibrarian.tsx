import React from 'react';
import { Box, Typography } from '@mui/material';
import './HomePageLibrarian.css';
import NavBarLibrarian from './NavBarLibrarian';

const HomePageLibrarian: React.FC = () => {
  return (
    <Box className="home-page-lib-wrapper">
      <NavBarLibrarian />
    </Box>
  );
};

export default HomePageLibrarian;
