import React from 'react';
import { Box, Typography } from '@mui/material';
import './HomePageLibrarian.css';
import NavBarLibrarian from './NavBarLibrarian';
import { useTranslation } from 'react-i18next';

function HomePageLibrarian() {
  const { t } = useTranslation();
  return (
    <>
      <NavBarLibrarian />
      <Box className="home-page-lib-wrapper">
        <Typography variant="h1">{t('ContactUs')}</Typography>
        <Box className="home-page-lib-contact-info">
          <Typography variant="body1">
            {t('Email')}: librarian@example.com
          </Typography>
          <Typography variant="body1">{t('Phone')}: (123) 456-7890</Typography>
          <Typography variant="body1">
            {t('Address')}: 123 Library St., Booktown
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default HomePageLibrarian;
