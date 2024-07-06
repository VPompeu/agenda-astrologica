import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './styles/Theme';
import SessionStore from './stores/SessionStore';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Page from "./components/Page";
import Register from './components/login/Register';
import Payment from './components/home/Payment';

const App = () => {

  const [theme, setTheme] = useState(lightTheme);


  useEffect(() => {
    bind();

    return clear;
  });

  const bind = () => {
    SessionStore.addListener("theme_change", toggleTheme);
  }

  const clear = () => {
    SessionStore.removeListener("theme_change", toggleTheme);
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
            <Route path="payment" element={<Payment />}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
