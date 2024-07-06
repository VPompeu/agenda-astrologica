import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import SessionStore from '../../stores/SessionStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  //const classes = Styles();

  useEffect(() => {
    SessionStore.verifyUserLicense(responseUserLicense);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const responseUserLicense = (response) => {
    console.log(response);
    if(response === "Unauthorized") {
      navigate("/login");
      return;
    }
    if(!response){
      navigate("/payment");
    }
  }

  return (
    <div>
      <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
        <p>Deu certo!</p>
      </Grid>
    </div>
  );
}

export default Home;
