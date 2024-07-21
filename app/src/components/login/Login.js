import React, { useState, useEffect } from 'react';
import MainButton from "../common/MainButton";
import TextField from '@mui/material/TextField';
import Styles from "../../styles/LoginStyle";
import Logo from '../../assets/logoSemFundo.png';
import SessionStore from '../../stores/SessionStore';
import { Grid, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuBar from '../MenuBar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const classes = Styles();

  useEffect(() => {
    setEmail(SessionStore.getEmail());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeInput = (event) => {
    setErrorMessage(""); // Limpa a mensagem de erro
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  const responseLogin = (response) => {
    if (response) {
      SessionStore.emit("login");
      navigate("/home");
    } else {
      // Define a mensagem de erro específica
      setErrorMessage("Senha incorreta. Verifique sua senha e tente novamente.");
    }
  };

  const login = () => {
    SessionStore.login(email, password, responseLogin);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <MenuBar />
      <Grid container sx={classes.container} spacing={2} direction="column" justifyContent="center" alignItems="center">
        <Grid item xs>
          <img src={Logo} alt="Logo" style={{ width: '250px', height: 'auto' }} />
        </Grid>
        <Grid item xs>
          <TextField
            error={!!errorMessage} // Se houver mensagem de erro, o TextField será estilizado como erro
            value={email}
            id="standard-basic"
            label="Email"
            name='email'
            variant="standard"
            onChange={onChangeInput}
            sx={{ width: '200px' }}
          />
        </Grid>
        <Grid item xs>
          <TextField
            error={!!errorMessage} // Se houver mensagem de erro, o TextField será estilizado como erro
            id="standard-basic"
            label="Senha"
            name='password'
            variant="standard"
            type={showPassword ? 'text' : 'password'}
            onChange={onChangeInput}
            sx={{ width: '200px' }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
          />
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
        {errorMessage && (
          <Grid item xs={12}>
            <Typography variant='body2' color='error'>
              {errorMessage}
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Login;
