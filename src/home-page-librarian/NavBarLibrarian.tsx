import React from 'react';
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import './NavBarLibrarian.css';

const NavBarLibrarian: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    <Box display="flex" justifyContent="space-between" marginTop={2}>
      <h1>Librarian's Home Page</h1>
      <Box display="flex" justifyContent="flex-start">
        <Button
          className="nav-lib-button"
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        ></Button>
        <Button
          className="nav-lib-button"
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
            className="nav-lib-text"
            onClick={() => handleNavigation('/book/getAll')}
          >
            Manage Books
          </MenuItem>
          <MenuItem
            className="nav-lib-text"
            onClick={() => handleNavigation('/loan/getAll')}
          >
            Manage Loans
          </MenuItem>
          <MenuItem
            className="nav-lib-text"
            onClick={() => handleNavigation('/user/getAll')}
          >
            Manage Users
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default NavBarLibrarian;
