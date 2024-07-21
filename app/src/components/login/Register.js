import React, { useState } from 'react';
import MainButton from "../common/MainButton";
import TextField from '@mui/material/TextField';
import Styles from "../../styles/RegisterStyle";
import Logo from '../../assets/logoSemFundo.png';

import { Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import MenuBar from '../MenuBar';
import SessionStore from '../../stores/SessionStore';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import handleCommonErrors from '../../stores/ErrorHandler';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const navigate = useNavigate();

    const classes = Styles();

    const validate = () => {
        let isValid = true;

        if (name.trim() === "") {
            setNameError("O nome é obrigatório.");
            isValid = false;
        } else {
            setNameError("");
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            setEmailError("Email inválido.");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (password.length < 6) {
            setPasswordError("Sua senha deve ter no mínimo 6 caracteres.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        const phonePattern = /^\d+$/; // Apenas números
        if (!phonePattern.test(phone)) {
            setPhoneError("Telefone inválido. Use apenas números.");
            isValid = false;
        } else {
            setPhoneError("");
        }

        return isValid;
    }

    const register = () => {
        if (validate()) {
            SessionStore.signin({ name, email, password, phone }, responseRegisterUser)
                .catch(error => handleCommonErrors(error));
        }
    }

    const responseRegisterUser = (response) => {
        if (response) {
            SessionStore.setEmail(response.email);
            setShowSuccessMessage(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    }

    const onChangeInput = (event) => {
        const { name, value } = event.target;
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        if (name === 'phone') setPhone(value);
    }

    const handleCloseSnackbar = () => {
        setShowSuccessMessage(false);
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
                    <TextField
                        id="standard-basic"
                        label="Nome"
                        name="name"
                        variant="standard"
                        onChange={onChangeInput}
                        error={!!nameError}
                        helperText={nameError}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="standard-basic"
                        label="Email"
                        name="email"
                        variant="standard"
                        onChange={onChangeInput}
                        error={!!emailError}
                        helperText={emailError}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="standard-basic"
                        label="Senha"
                        name='password'
                        variant="standard"
                        type={showPassword ? 'text' : 'password'}
                        onChange={onChangeInput}
                        error={!!passwordError}
                        helperText={passwordError}
                        sx={{ width: '200px' }}
                        InputProps={{
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
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="standard-basic"
                        label="Telefone"
                        name="phone"
                        variant="standard"
                        onChange={onChangeInput}
                        error={!!phoneError}
                        helperText={phoneError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MainButton onClick={register} text={"Registrar-se"} />
                </Grid>
            </Grid>

            <Snackbar open={showSuccessMessage} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="success" elevation={6} variant="filled">
                    Usuário registrado com sucesso!
                </MuiAlert>
            </Snackbar>
        </Grid>
    );
}

export default Register;
