import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './styles/Theme';
import { Navigate } from "react-router-dom";
import SessionStore from './stores/SessionStore';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Page from "./components/Page";
import Register from './components/login/Register';

const App = () => {

  const [theme, setTheme] = useState(lightTheme);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    bind();

    return clear;
  });

  const handleLogin = () => {
    const token = SessionStore.getToken();
    if(token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }

  const bind = () => {
    SessionStore.addListener("theme_change", toggleTheme);
    SessionStore.addListener("login", handleLogin);
  }

  const clear = () => {
    SessionStore.removeListener("theme_change", toggleTheme);
    SessionStore.removeListener("login", handleLogin);
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.palette.mode === 'light' ? darkTheme : lightTheme));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route path="home" element={<Home />} />
            <Route path="license" element={<Home />}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
