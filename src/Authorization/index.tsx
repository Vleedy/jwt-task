import React from 'react';
import LoginUI from './LoginUI';
import { Grid, ThemeProvider } from '@mui/material';
import { theme } from '../styles/libs/Themes/Authorization';
import RegistrationUI from './RegistrationUI';

const Authorization = () => {
  const [isHaveAccount, setIsHaveAccount] = React.useState<Boolean>(true);

  return (
    <Grid sx={{ height: '100vh' }} container justifyContent="center" alignItems="center">
      <Grid item xs={10} sm={4} md={3} xl={2.2}>
        <ThemeProvider theme={theme}>
          {isHaveAccount ? (
            <LoginUI setIsHaveAccount={setIsHaveAccount} />
          ) : (
            <RegistrationUI setIsHaveAccount={setIsHaveAccount} />
          )}
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default Authorization;
