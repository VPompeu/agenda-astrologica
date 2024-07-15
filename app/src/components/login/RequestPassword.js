import React, { useState } from 'react';
import MainButton from "../common/MainButton";
import Styles from "../../styles/ResetPasswordStyle";
import Logo from '../../assets/logoSemFundo.png';
import TextField from '@mui/material/TextField';


import { Grid, Typography } from '@mui/material';
import MenuBar from '../MenuBar';
import SessionStore from '../../stores/SessionStore';


const RequestPassword = () => {

    const [email, setEmail] = useState("");
    const [result, setResult] = useState("");

    const classes = Styles();

    const onChangeInput = (e) => {
        setEmail(e.target.value);
    }

    const setResetPassword = () => {
        SessionStore.requestPasswordReset(email, responseResetPassword);
    }

    const responseResetPassword = (response) => {
        if (response && response.message === "Email enviado com sucesso!") {
            setResult("OK")
        } else {
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
                        Insira o email associado a sua conta
                    </Typography>
                </Grid>
                {result === "OK" &&
                    <Grid item xs>
                        <Typography variant='body1'>
                            Confira sua caixa de email
                        </Typography>
                    </Grid>
                }
                {result === "ERROR" &&
                    <Grid item xs>
                        <Typography variant='body1'>
                            Veirifique o endereço de email informado!
                        </Typography>
                    </Grid>
                }
                {result === "" &&
                    <Grid item xs>
                        <TextField id="standard-basic" value={email} label="Email" name="email" variant="standard" onChange={onChangeInput} />
                    </Grid>
                }
                <Grid item xs={12}>
                    <MainButton onClick={setResetPassword} text={"Enviar"} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default RequestPassword;