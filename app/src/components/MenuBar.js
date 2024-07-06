import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import Styles from "../styles/MenuBarStyle";

import SessionStore from '../stores/SessionStore';

const MenuBar = () => {

  const classes = Styles();
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonText, setButtonText] = useState("");
  const [themeState, setThemeState] = useState(false);

  useEffect(() => {
    if (location.pathname === "/login") {
      setButtonText("Registrar");
    } else if (SessionStore.getToken()) {
      setButtonText("Sair")
    } else {
      setButtonText("Entrar");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onToggleTheme = () => {
    SessionStore.emit("theme_change");
    setThemeState(!themeState);
  }

  const buttonLogin = () => {
    console.log(location.pathname);
    if (location.pathname === "/login") {
      setButtonText("Entrar");
      navigate("/register");
    } else if (buttonText === "Sair") {
      SessionStore.removeToken();
      navigate("/login");
    } else {
      setButtonText("Registrar");
      navigate("/login");
    }

  }

  return (
    <Grid sx={classes.container}>
      <AppBar position="static">
        <Toolbar>
          {SessionStore.getToken() &&
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Agenda Astrológica
          </Typography>
          <IconButton onClick={onToggleTheme} aria-label="Theme">
            {!themeState && <DarkModeIcon sx={classes.colorIcon} />}
            {themeState && <LightModeIcon />}
          </IconButton>
          <Button sx={classes.colorButton} onClick={buttonLogin}>{buttonText}</Button>
        </Toolbar>
      </AppBar>

    </Grid>
  );
}

export default MenuBar;
