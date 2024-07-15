import { Collapse, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
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

import CalendarStore from '../../stores/CalendarStore';
import TextEditor from './TextEditor';
import MainButton from "../common/MainButton";

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
  const [id, setId] = useState(null);
  const [note, setNote] = useState({});
  const [save, setSave] = useState(true);
  const [userNote, setUserNote] = useState("");
  const [calendarShow, setCalendarShow] = useState(false);
  const [date, setDate] = useState(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [dayWeek, setDayWeek] = useState("");

  const textRef = useRef("");

  const classes = Styles();

  useEffect(() => {
    setDate(moment());
    setDay(moment().format("DD"));
    setMonth(moment().format("MMMM"));
    setDayWeek(moment().format("dddd"));

    getUserNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (date) {
      setDay(date.format("DD"));
      setMonth(date.format("MMMM"));
      setDayWeek(date.format("dddd"));

      CalendarStore.getGlobalNote(date.format("DDMMYYYY"), responseGetGlobalNotes);
      CalendarStore.getUserNote(date.format("DDMMYYYY"), responseGetUserNote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const getUserNote = () => {
    CalendarStore.getUserNote(moment().format("DDMMYYYY"), responseGetUserNote)
  }

  const responseGetUserNote = (response) => {
    if (response) {
      setUserNote(response.note);
      setId(response.id);
    } else {
      setUserNote("");
      setId(null);
    }
  }
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

  const responseGetGlobalNotes = (response) => {
    setNote(response);
  }

  const ActionCalendarBar = () => {

    return (
      <Grid item xs={12}>
        <Grid container>
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
            <DateCalendar
                value={date}
                onChange={onChangeDate}
                minDate={moment("2024-01-01")} // Define a data mínima como 01/01/2024
                maxDate={moment("2024-12-31")} // Define a data máxima como 31/12/2024
              />
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
        </Grid>
      </Grid>
    )
  }

  const NoteTabs = () => {
    return (
      <Grid item xs={12}>
        <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="note tabs">
          <Tab label="O que diz Paula Arruda ?" {...a11yProps(0)} />
          <Tab label="Anotações" {...a11yProps(1)} />
        </Tabs>
      </Grid>
    )
  }

  const GlobalNotesComponent = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            {note?.note || "Sem notas para esse dia"}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  const onChange = (value) => {
    const v = value;
    textRef.current = v;
    setSave(false);
  }

  const onClickSave = () => {
    if(id){
      CalendarStore.putUserNote({id: id, note: textRef.current, note_date: date.format("DD/MM/YYYY") }, responseUpdateUserNote)
    }else{
      CalendarStore.postUserNote({ note: textRef.current, note_date: date.format("DD/MM/YYYY") }, responseAddUserNote);
    }
  }

  const responseAddUserNote = (response) => {
    if (response) {
      setUserNote(response.note);
      setSave(true);
    }
  }

  const responseUpdateUserNote = (response) => {
    if (response) {
      setUserNote(response.note);
      setSave(true);
    }
  }

  const UserNotesComponent = () => {

    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={classes.textEditor}>
          <TextEditor onChange={onChange} defaultValue={userNote} />
        </Grid>
        <Grid item>
          <MainButton onClick={onClickSave} text={save ? "Salvo!" : "Salvar"} />
        </Grid>
      </Grid>
    )
  }

  return (


    <Grid container sx={classes.container} justifyContent="center" alignItems="center">
      <ActionCalendarBar />

      <NoteTabs />

      <Grid item xs={12}>
        <CustomTabPanel value={value} index={0}>
          <GlobalNotesComponent />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <UserNotesComponent />
        </CustomTabPanel>
      </Grid>
    </Grid>

  );
}
Calendar.propTypes = {
  onChange: PropTypes.func,
};
export default Calendar;
