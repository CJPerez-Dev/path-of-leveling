import React from 'react';
import { version } from '../../../../package.json';
import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings';
import RouteIcon from '@mui/icons-material/Route';
import HomeIcon from '@mui/icons-material/Home';

function HomePage() {
  return (
    <React.Fragment>
      <h1>Path of Leveling</h1>
      <p className="read-the-docs">Created by Chase Perez</p>
      <h5>Version: {version}</h5>
      <Grid container>
        <Grid item xs={4}>
          <SettingsIcon fontSize="large" />
        </Grid>
        <Grid item xs={4}>
          <HomeIcon fontSize="large" />
        </Grid>
        <Grid item xs={4}>
          <RouteIcon fontSize="large" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default HomePage;
