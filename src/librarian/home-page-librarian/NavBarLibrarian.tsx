import React from 'react';
import { Button, Box, Typography, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';
import './NavBarLibrarian.css';

const NavBarLibrarian: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      className="nav-bar"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography className="nav-title">
        {t('Library')} <span className="nav-subtitle">{t('forLibrarian')}</span>
      </Typography>
      <Box display="flex" alignItems="center">
        <Button
          className="nav-read-button"
          variant="contained"
          onClick={() => changeLanguage('en')}
        >
          EN
        </Button>
        <Button
          className="nav-read-button"
          variant="contained"
          onClick={() => changeLanguage('pl')}
        >
          PL
        </Button>
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
            {t('ManageBooksPath')}
          </MenuItem>
          <MenuItem
            className="nav-read-text"
            onClick={() => handleNavigation('/librarian/manage-loans')}
          >
            {t('ManageLoans')}
          </MenuItem>
          <MenuItem
            className="nav-read-text"
            onClick={() => handleNavigation('/librarian/manage-users')}
          >
            {t('ManageUsers')}
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default NavBarLibrarian;
