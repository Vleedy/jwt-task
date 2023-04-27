import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.6)',
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
              borderColor: 'rgba(255, 255, 255, 0.6)',
            },
            '&:hover fieldset': {
              borderColor: 'rgb(255, 255, 255)',
            },
            '&.Mui-focused fieldset': {
              border: '1px solid',
              borderColor: 'rgb(255, 255, 255)',
            },
            '& input': {
              color: 'white', // изменение цвета текста внутри input
            },
          },
          '& label': {
            color: 'white', // изменение цвета label
            '&.Mui-focused': {
              color: 'white',
            }, // изменение цвета текста лейбла при фокусе
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: 'rgba(255, 255, 255, 0.6)',
    },
  },
});