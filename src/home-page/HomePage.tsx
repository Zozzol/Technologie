import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import MenuAppBar from '../app-bar/MenuAppBar';
import photo from './photo.jpg';

console.log(photo);

const HomePage: React.FC = () => {
  return (
    <div>
      <MenuAppBar />
      <Container>
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          style={{ marginTop: '20px' }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              color="primary"
              gutterBottom
              style={{ marginTop: '20px' }}
            >
              Welcome!
            </Typography>
            <Typography variant="body1" color="primary" gutterBottom>
              This application allows you to manage the borrowing and
              availability of books in our library.
            </Typography>
            <Box marginTop={4}>
              <Typography variant="body1" color="primary" gutterBottom>
                Contact info to library:
              </Typography>
              <Typography variant="body1" color="primary">
                Address: 123 Library Lane, Booktown, BK 56789
              </Typography>
              <Typography variant="body1" color="primary">
                Phone: (123) 456-7890
              </Typography>
              <Typography variant="body1" color="primary">
                Email: info@library.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={photo}
              alt="photo"
              style={{ width: '100%', height: 'auto', marginTop: '20px' }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
