import React from 'react';
import { Box } from '@mui/material';
import './UsersPageLibrarian.css';
import UsersListLibrarian from './UsersListLibrarian';
import NavBarLibrarian from '../home-page-librarian/NavBarLibrarian';

const UsersPageLibrarian: React.FC = () => {
  return (
    <>
      <NavBarLibrarian />
      <Box className="userspage-lib-wrapper">
        <UsersListLibrarian />
      </Box>
    </>
  );
};

export default UsersPageLibrarian;
