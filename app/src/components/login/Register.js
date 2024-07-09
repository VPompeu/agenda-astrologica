import React, { useState } from 'react';
import MainButton from "../common/MainButton";
import TextField from '@mui/material/TextField';
import Styles from "../../styles/RegisterStyle";
import Logo from '../../assets/logoSemFundo.png';

import { Grid } from '@mui/material';
import MenuBar from '../MenuBar';
import SessionStore from '../../stores/SessionStore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    const classes = Styles();

    const register = () => {
        SessionStore.signin({name, email, password, phone}, responseRegisterUser);
    }

    const responseRegisterUser = (response) => {
        if(response){
            console.log(response)
            SessionStore.setEmail(response.email);
            navigate("/login");
        }
    }
    const onChangeInput = (event) => {

        if (event.target.name === 'name') {
            setName(event.target.value);
        }
        if (event.target.name === 'email') {
            setEmail(event.target.value);
        }
        if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
        if (event.target.name === 'phone') {
            setPhone(event.target.value);
        }
      
    }

    return (
        <Grid>
            <MenuBar />
            <Grid container sx={classes.container} spacing={2} direction="column" justifyContent="center" alignItems="center">
                <Grid item xs>
                    <img src={Logo} alt="Logo" style={{ width: '300px', height: 'auto' }} />
                </Grid>
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
                <Grid item xs={12}>
                    <MainButton onClick={register} text={"Register"} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Register;