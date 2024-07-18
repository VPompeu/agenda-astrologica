import React, { useState, useEffect } from 'react';
import MainButton from "../common/MainButton";
import TextField from '@mui/material/TextField';
import Styles from "../../styles/LoginStyle";
import Logo from '../../assets/logoSemFundo.png';
import SessionStore from '../../stores/SessionStore';
import { Grid, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuBar from '../MenuBar';
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const classes = Styles();

  useEffect(() => {
    setEmail(SessionStore.getEmail());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeInput = (event) => {
    setError(false);
    if (event.target.name === 'email') {
      setEmail(event.target.value)
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }

  const responseLogin = (response) => {
    if (response) {
      SessionStore.emit("login");
      navigate("/home");
    } else {
      setError(true);
    }
  }

  const login = () => {
    SessionStore.login(email, password, responseLogin);
  }

  return (
    <div>
      <MenuBar />
      <Grid container sx={classes.container} spacing={2} direction="column" justifyContent="center" alignItems="center">
        <Grid item xs>
          <img src={Logo} alt="Logo" style={{ width: '250px', height: 'auto' }} />
        </Grid>
        <Grid item xs>
          <TextField error={error} value={email} id="standard-basic" label="Email" name='email' variant="standard" onChange={onChangeInput} />
        </Grid>
        <Grid item xs>
          <TextField error={error} id="standard-basic" label="Senha" name='password' variant="standard" type="password" onChange={onChangeInput} />
        </Grid>
        <Grid item xs={12}>
          <MainButton sx={classes.loginButton} onClick={login} text={"Entrar"} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2'>
            <Link href="/request_password" variant="body2">
              Esqueceu sua senha ?
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
