import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";

import Styles from "../styles/MenuBarStyle";

import sessionStore from '../stores/SessionStore';

const MenuBar = () => {

  const classes = Styles();
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    if(location.pathname === "/login") {
      setButtonText("Registrar");
    } else{
      setButtonText("Login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const onToggleTheme = () => {
    sessionStore.emit("theme_change")
  }

  const buttonLogin = () => {
    console.log(location.pathname);
    if(location.pathname === "/login") {
      setButtonText("Entrar");
      navigate("/register");
    } else{
      setButtonText("Registrar");
      navigate("/login");
    }
    
  }

  return (
    <Grid sx={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Agenda Astrológica
          </Typography>
          <Button onClick={onToggleTheme} sx={classes.colorButton}> Tema </Button>
          <Button sx={classes.colorButton} onClick={buttonLogin}>{buttonText}</Button>
        </Toolbar>
      </AppBar>
      
    </Grid>
  );
}

export default MenuBar;
