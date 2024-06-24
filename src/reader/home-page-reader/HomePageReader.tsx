import React from 'react';
import { Box, Typography } from '@mui/material';
import './HomePageReader.css';
import NavBarReader from './NavBarReader';

const HomePageReader: React.FC = () => {
  return (
    <>
      <NavBarReader />
      <Box className="home-page-read-wrapper">
        <Typography variant="h1">Contact Us</Typography>
        <Box className="home-page-read-contact-info">
          <Typography variant="body1">Email: library@example.com</Typography>
          <Typography variant="body1">Phone: (123) 456-7890</Typography>
          <Typography variant="body1">
            Address: 123 Library St., Booktown
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default HomePageReader;
