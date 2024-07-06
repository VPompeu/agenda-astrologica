import { createTheme } from '@mui/material/styles';

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//     colors: {
//       onPrimary: "#FF0000"
//     }
//   },
// });

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#90caf9',
//     },
//     secondary: {
//       main: '#f48fb1',
//     },
//     colors: {
//       onPrimary: "#FF0000"
//     }
//   },

// });

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#673AB7', // Indigo
//     },
//     secondary: {
//       main: '#D1C4E9', // Lavender
//     },
//     colors: {
//       onPrimary: '#9575CD', // Amethyst
//     },
//   },
// });

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4527A0', // Indigo Darker
    },
    secondary: {
      main: '#B39DDB', // Lavender Darker
    },
    colors: {
      onPrimary: '#7E57C2', // Amethyst Darker
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4A148C', // Purple
    },
    secondary: {
      main: '#FF6F00', // Amber
    },
    colors: {
      tertiary: "#F8BBD0" // Pink
    }
  },

});

// const starryNightDark = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#38006B', // Purple Darker
//     },
//     secondary: {
//       main: '#C56000', // Amber Darker
//     },
//     tertiary: {
//       main: '#E1BEE7', // Pink Darker
//     },
//   },
// });


export { lightTheme, darkTheme };
