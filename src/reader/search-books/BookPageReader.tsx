import React from 'react';
import { Box } from '@mui/material';
import './BookPageReader.css';
import BookListReader from './BookListReader';
import NavBarReader from '../home-page-reader/NavBarReader';

const BookPageReader: React.FC = () => {
  return (
    <>
      <NavBarReader />
      <Box className="bookpage-reader-wrapper">
        <BookListReader />
      </Box>
    </>
  );
};

export default BookPageReader;
