import React, { useState } from 'react';
import MainButton from "../common/MainButton";
import TextField from '@mui/material/TextField';
import Styles from "../../styles/RegisterStyle";

import { Grid } from '@mui/material';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const classes = Styles();

    const register = () => {
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(phone);
        console.log(birthday);
        console.log(city);
        console.log(state);
        console.log(country);
    }

    const onChangeInput = (event) => {
        console.log(event);
        if(event.target.name === 'name'){
            setName(event.target.value);
        }
        if(event.target.name === 'email'){
            setEmail(event.target.value);
        }
        if(event.target.name === 'password'){
            setPassword(event.target.value);
        }
        if(event.target.name === 'phone'){
            setPhone(event.target.value);
        }
        if(event.target.name === 'birthday'){
            setBirthday(event.target.value);
        }
        if(event.target.name === 'city'){
            setCity(event.target.value);
        }
        if(event.target.name === 'state'){
            setState(event.target.value);
        }
        if(event.target.name === 'country'){
            setCountry(event.target.value);
        }
    }

    return(
        <Grid container sx={classes.container} spacing={2} direction="column" justifyContent="center" alignItems="center">
            <Grid item xs>
                <TextField id="standard-basic" label="Nome" name="name" variant="standard" onChange={onChangeInput} />
            </Grid>
            <Grid item xs>
                <TextField id="standard-basic" label="Email" name="email" variant="standard" onChange={onChangeInput} />
            </Grid>
            <Grid item xs>
                <TextField id="standard-basic" label="Senha" name="password" variant="standard" type="password" onChange={onChangeInput} />
            </Grid>
            <Grid item xs>
                <TextField id="standard-basic" label="Telefone" name="phone" variant="standard" onChange={onChangeInput} />
            </Grid>
            <Grid item xs>
                <TextField id="standard-basic" label="Data de Nascimento" name="birthday" placeholder="utilize o modelo 00/00/0000" variant="standard" onChange={onChangeInput} />
            </Grid>
            <Grid item xs>
                <TextField id="standard-basic" label="Cidade" name="city" variant="standard" onChange={onChangeInput} />
            </Grid>
            <Grid item xs>
                <TextField id="standard-basic" label="Sigla do Estado" name="state" variant="standard" onChange={onChangeInput} />
            </Grid>
            <Grid item xs>
                <TextField id="standard-basic" label="País" name="country" variant="standard" onChange={onChangeInput} />
            </Grid>
            <Grid item xs={12}>
                <MainButton  onClick={register} text={"Register"} />
            </Grid>
        </Grid>
    );
}

export default Register;