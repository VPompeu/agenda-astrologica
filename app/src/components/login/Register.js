import React, { useState } from 'react';
import MainButton from "../common/MainButton";
import TextField from '@mui/material/TextField';
import Styles from "../../styles/RegisterStyle";
import Logo from '../../assets/logoSemFundo.png';

import { Grid, Snackbar } from '@mui/material'; // Importe o Snackbar
import MuiAlert from '@mui/material/Alert';
import MenuBar from '../MenuBar';
import SessionStore from '../../stores/SessionStore';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para controlar a exibição da mensagem de sucesso

    const navigate = useNavigate();

    const classes = Styles();

    const register = () => {
        SessionStore.signin({name, email, password, phone}, responseRegisterUser);
    }

    const responseRegisterUser = (response) => {
        if(response){
            SessionStore.setEmail(response.email);
            setShowSuccessMessage(true); // Mostrar a mensagem de sucesso após o registro
            setTimeout(() => {
                navigate("/login");
            }, 2000); // Redirecionar para a página de login após 2 segundos
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

    const handleCloseSnackbar = () => {
        setShowSuccessMessage(false); // Fechar a mensagem de sucesso quando o usuário a fechar manualmente
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };

    return (
        <Grid>
            <MenuBar />
            <Grid container sx={classes.container} spacing={2} direction="column" justifyContent="center" alignItems="center">
                <Grid item xs>
                    <img src={Logo} alt="Logo" style={{ width: '250px', height: 'auto' }} />
                </Grid>
                <Grid item xs>
                    <TextField id="standard-basic" label="Nome" name="name" variant="standard" onChange={onChangeInput} />
                </Grid>
                <Grid item xs>
                    <TextField id="standard-basic" label="Email" name="email" variant="standard" onChange={onChangeInput} />
                </Grid>
                <Grid item xs>
                    <TextField id="standard-basic" label="Senha" name="password" variant="standard" type="password" onChange={onChangeInput} sx={{width:'185px'}} InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                    ),
                    }}/>
                </Grid>
                <Grid item xs>
                    <TextField id="standard-basic" label="Telefone" name="phone" variant="standard" onChange={onChangeInput} />
                </Grid>
                <Grid item xs={12}>
                    <MainButton onClick={register} text={"Registrar-se"} />
                </Grid>
            </Grid>

            {/* Snackbar para exibir a mensagem de sucesso */}
            <Snackbar open={showSuccessMessage} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="success" elevation={6} variant="filled">
                    Usuário registrado com sucesso!
                </MuiAlert>
            </Snackbar>
        </Grid>
    );
}

export default Register;
