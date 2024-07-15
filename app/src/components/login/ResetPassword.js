import React, { useState, useEffect } from 'react';
import MainButton from "../common/MainButton";
import Styles from "../../styles/ResetPasswordStyle";
import Logo from '../../assets/logoSemFundo.png';
import TextField from '@mui/material/TextField';


import { Grid, Typography } from '@mui/material';
import MenuBar from '../MenuBar';
import SessionStore from '../../stores/SessionStore';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [result, setResult] = useState("");

    const classes = Styles();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    useEffect(() => {
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeInput = (e) => {
        if (e.target.name === "password")
            setPassword(e.target.value);
        else
            setNewPassword(e.target.value)
    }

    const setResetPassword = () => {
        console.log(password)
        console.log(newPassword)
        console.log(token)
        if (password === newPassword && token) {
            SessionStore.sendNewPassword(newPassword, token, responseResetPassword);
        }
    }

    const responseResetPassword = (response) => {
        if(response && response.message === "Password has been reset"){
            navigate("/login")
        }else{
            setResult("ERROR")
        }
    }
    return (
        <Grid>
            <MenuBar />
            <Grid container sx={classes.container} spacing={2} direction="column" justifyContent="center" alignItems="center">
                <Grid item xs>
                    <img src={Logo} alt="Logo" style={{ width: '300px', height: 'auto' }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body2'>
                        Insira sua nova senha
                    </Typography>
                </Grid>
                {result === "" &&
                    <Grid item xs>
                        <TextField id="standard-basic" type='password' value={password} label="Nova senha" name="password" variant="standard" onChange={onChangeInput} />
                    </Grid>
                }
                {result === "" &&
                    <Grid item xs>
                        <TextField id="standard-basic" type='password' value={newPassword} label="Insira a senha novamente" name="newPassword" variant="standard" onChange={onChangeInput} />
                    </Grid>
                }
                <Grid item xs={12}>
                    <MainButton onClick={setResetPassword} text={"Enviar"} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ResetPassword;