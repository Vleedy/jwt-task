import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#149997' /*'rgba(255, 255, 255, 0.6)'*/,
        },
        fontSizeLarge: {
          fontSize: '100px',
          marginBottom: '10px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '15px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#149997' /*'rgba(255, 255, 255, 0.6)'*/,
            },
            '&:hover fieldset': {
              borderColor: '#233043',
            },
            '&.Mui-focused fieldset': {
              border: '1px solid',
              borderColor: '#233043',
            },
            '& input': {
              color: ' #575757', // изменение цвета текста внутри input
              background: 'none',
              fontSize: '17px',
              fontWeight: 300,
            },
          },
          '& label': {
            color: '#575757', // изменение цвета label
            '&.Mui-focused': {
              color: '#233043',
            }, // изменение цвета текста лейбла при фокусе
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#149997' /*'rgba(255, 255, 255, 0.6)'*/,
    },
  },
});
