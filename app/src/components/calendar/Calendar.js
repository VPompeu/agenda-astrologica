import { Collapse, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Styles from "../../styles/CalendarStyle";
import moment from "moment";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Calendar = () => {

  const [value, setValue] = useState(0);
  const [calendarShow, setCalendarShow] = useState(false);
  const [date, setDate] = useState(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [dayWeek, setDayWeek] = useState("");

  const classes = Styles();

  useEffect(() => {
    setDate(moment());
    setDay(moment().format("DD"));
    setMonth(moment().format("MMMM"));
    setDayWeek(moment().format("dddd"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (date) {
      setDay(date.format("DD"));
      setMonth(date.format("MMMM"));
      setDayWeek(date.format("dddd"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const toggleCalendar = () => {
    setCalendarShow(!calendarShow);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeDate = (date) => {
    setDate(date);
  }

  const onClickBack = () => {
    let d = moment(date).subtract(1, 'd');
    setDate(d);
  }

  const onClickForward = () => {
    let d = moment(date).add(1, 'd');
    setDate(d);
  }

  return (


    <Grid container sx={classes.container} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <IconButton onClick={onClickBack}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={toggleCalendar}>
              <CalendarMonthIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={onClickForward}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Collapse in={calendarShow}>
          <DateCalendar value={date} onChange={onChangeDate} />
        </Collapse>
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={classes.textAlign} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant='subtitle1'>
              {day + " de " + month}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>
              {dayWeek}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="basic tabs example">
          <Tab label="O que diz Paula Arruda ?" {...a11yProps(0)} />
          <Tab label="Anotações" {...a11yProps(1)} />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
      </Grid>
    </Grid>

  );
}

export default Calendar;
