import React from 'react';
import { Box } from '@mui/material';
import './BookPageLibrarian.css';
import BookListLibrarian from './BookListLibrarian';
import NavBarLibrarian from '../home-page-librarian/NavBarLibrarian';

const BookPageLibrarian: React.FC = () => {
  return (
    <>
      <NavBarLibrarian />
      <Box className="bookpage-lib-wrapper">
        <BookListLibrarian />
      </Box>
    </>
  );
};

export default BookPageLibrarian;
