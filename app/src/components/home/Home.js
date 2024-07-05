import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SessionStore from '../../stores/SessionStore';

const Home = () => {

  //chamar SessionStore

  //const classes = Styles();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>
      <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
        <p>Deu certo!</p>
      </Grid>
    </div>
  );
}

export default Home;
