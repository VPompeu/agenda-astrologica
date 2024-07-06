import { useTheme } from '@mui/material/styles';

const Styles = () => {
  const theme = useTheme();
  return {
    container: {
     background: theme.palette.colors.onPrimary,
    },
    colorButton: {
      color: "white",
    },
    colorIcon: {
      color: "white",
    }
  };
};

export default Styles;
