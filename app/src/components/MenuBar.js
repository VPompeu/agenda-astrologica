import React from 'react';

import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';

import Styles from "../styles/MenuBarStyle";

import sessionStore from '../stores/SessionStore';

const MenuBar = () => {

  const classes = Styles();

  const onToggleTheme = () => {
    sessionStore.emit("theme_change")
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
          <Link to="/login"><Button sx={classes.colorButton}>Entrar</Button></Link>
          <Link to="/register"><Button sx={classes.colorButton}>Cadastrar</Button></Link>
        </Toolbar>
      </AppBar>
      
    </Grid>
  );
}

export default MenuBar;
