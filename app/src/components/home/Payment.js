import React, { useState, useRef, useEffect } from 'react';
import { Grid, Typography, Box, Modal, Button, Link } from '@mui/material';
import Styles from "../../styles/PaymentStyle";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import MainButton from "../common/MainButton";
import SessionStore from '../../stores/SessionStore';


const Payment = () => {

  const classes = Styles();
  const [user, setUser] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('Pix');
  const [modalOpen, setModalOpen] = useState(false);
  const pixCopy = useRef(null);


  useEffect(() => {
    setUser(SessionStore.getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  }

  const handleCopyPix = () => {
    if (pixCopy.current) {
      const textPixCopy = pixCopy.current.innerText;
      navigator.clipboard.writeText(textPixCopy)
        .then(() => {
          console.log('Chave pix copiada');
        })
        .catch((err) => {
          console.error('Falha ao copiar chave pix: ', err);
        });
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Grid container sx={classes.container} spacing={2} direction="column" justifyContent="center" alignItems="center">
        <Typography variant='h6'>{"Seja bem-vindo(a) " + user.name + "!"}</Typography>
        <Typography variant='h2'>{"R$ 77,00"}</Typography>

        <Grid item xs>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Pix"
              name="radio-buttons-group"
              value={paymentMethod}
              onChange={handlePaymentChange}>
              <FormControlLabel value="Pix" control={<Radio />} label="Pix" />
              <FormControlLabel value="PagSeguro" control={<Radio />} label="PagSeguro" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs>
          {paymentMethod === 'Pix' ? (
            <Box textAlign="center" sx={{ width: '400px', wordBreak: 'break-word' }}>
              <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item sx={{ textAlign: 'left' }}>
                  <Typography variant="h6">Instruções de pagamento:</Typography>
                  <Typography>1. Copie o código pix</Typography>
                  <Typography>2. Abra o aplicativo do seu banco</Typography>
                  <Typography>3. Cole o código e finalize a transação</Typography>
                  <Typography>4. Envie o comprovante seguindo as instruções do botão "Enviar comprovante"</Typography>
                </Grid>
                <br></br>
                <Divider variant="middle" flexItem />
                <Grid item>
                  <Typography ref={pixCopy} style={{ fontSize: '12px' }}>
                    00020101021126810014br.gov.bcb.pix0131paulaarrudaastrologia@gmail.com0224Gratidao pela confianca 520400005303986540577.005802BR5920PAULA ARRUDA PENTEAD6009SAO PAULO62070503***6304D944
                  </Typography>
                </Grid>
                
                <Grid item>
                  <MainButton sx={classes.loginButton} onClick={handleCopyPix} text={"Copiar código pix"} />
                </Grid>
                <Grid item>
                  <MainButton sx={classes.loginButton} onClick={handleOpenModal} text={"Enviar comprovante"} />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box textAlign="center" sx={{ width: '400px', wordBreak: 'break-word' }}>
              <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item sx={{ textAlign: 'left' }}>
                  <Typography variant="h6">Instruções de pagamento:</Typography>
                  <Typography>1. Realize o pagamento pela plataforma do PagSeguro clicando em "Ir para pagamento"</Typography>
                  <Typography>2. Após a conclusão, envie o comprovante seguindo as instruções do botão "Enviar comprovante"</Typography>
                  <Typography sx={{color: 'red'}}>*Lembrando que pagamento via PagSeguro tem uma taxa de 5 reais, alterando o valor de R$77,00 para R$82,00</Typography>
                </Grid>
                <br></br>
                <Divider variant="middle" flexItem />
                <br></br>
                <Grid item>
                  <Link href='https://pag.ae/7-Gsoij12' target='_blank'><MainButton sx={classes.loginButton} text={"Ir para pagamento"} /> </Link>
                </Grid>
                <Grid item>
                  <MainButton sx={classes.loginButton} onClick={handleOpenModal} text={"Enviar comprovante"} />
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>

      <Grid item sx>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box textAlign="center" sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#B39DDB',
            border: '2px solid #7E57C2',
            borderRadius: 8,
            boxShadow: 24,
            backgroundColor: "#B39DDB",
            p: 4,
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Whatsapp
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Você pode enviar o comprovante por whatsapp para o número +5511930803750 ou clique <Link href='https://wa.me/+5511930803750' target='_blank'><strong>aqui</strong></Link>
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              E-mail
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Você pode enviar o comprovante para o e-mail astrologiapaulaarruda@gmail.com ou clique <Link href='mailto:astrologiapaulaarruda@gmail.com' target='_blank'><strong>aqui</strong></Link>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Ao enviar o comprovante, dentro de instantes sua estará pronta com muito carinho para usar 😊
            </Typography>
            <Button onClick={handleCloseModal}>Entendi</Button>
          </Box>
        </Modal>
      </Grid>
    </div>
  );
}

export default Payment;
