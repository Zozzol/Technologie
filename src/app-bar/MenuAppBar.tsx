import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate

export default function MenuAppBar() {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const navigate = useNavigate(); // Using useNavigate for navigation

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogOutClick = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Library
        </Typography>
        <Button
          color="inherit"
          endIcon={<LogoutIcon />}
          onClick={handleLogOutClick}
        ></Button>
        <Menu
          id="basic-menu"
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(menuAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigate('/allbooks')}>All Books</MenuItem>
          <MenuItem onClick={() => navigate('/rentedbooks')}>
            Rented Books
          </MenuItem>
          <MenuItem onClick={() => navigate('/home')}>Home Page</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
