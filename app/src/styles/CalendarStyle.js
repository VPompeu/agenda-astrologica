//import { useTheme } from '@mui/material/styles';

const PaymentStyle = () => {
  //const theme = useTheme();

  return {
    container: {
      marginTop: "10px"
    },
    textAlign: {
      textAlign: "center"
    },
    textEditor: {
      minHeight: "300px"
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80vw',
      bgcolor: 'white',
      border: '2px solid #7E57C2',
      boxShadow: 24,
      p: 4,
      zIndex: 100,
      padding: '16px',
      marginLeft: '0px'
    }
  };
};

export default PaymentStyle;
