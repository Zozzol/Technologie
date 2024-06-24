import React from 'react';
import { Button, Box, Typography, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import './NavBarLibrarian.css';

const NavBarLibrarian: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <Box
      className="nav-bar"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography className="nav-title">
        Library <span className="nav-subtitle">for Librarian</span>
      </Typography>
      <Box display="flex" alignItems="center">
        <Button
          className="nav-read-button"
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => handleNavigation('/librarian/home')}
        ></Button>
        <Button
          className="nav-read-button"
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        ></Button>
        <Button
          className="nav-read-button"
          variant="contained"
          startIcon={<MenuIcon />}
          onClick={handleMenuClick}
        ></Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            className="nav-read-text"
            onClick={() => handleNavigation('/librarian/manage-books')}
          >
            Manage Books
          </MenuItem>
          <MenuItem
            className="nav-read-text"
            onClick={() => handleNavigation('/librarian/manage-loans')}
          >
            Manage Loans
          </MenuItem>
          <MenuItem
            className="nav-read-text"
            onClick={() => handleNavigation('/librarian/manage-users')}
          >
            Manage Users
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default NavBarLibrarian;
