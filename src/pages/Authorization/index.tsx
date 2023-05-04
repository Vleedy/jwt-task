import { FC, useState } from 'react';
import { LoginUI } from './LoginUI';
import { RegistrationUI } from './RegistrationUI';
import { Grid, ThemeProvider } from '@mui/material';
import { theme } from '../../styles/libs/Themes/Authorization';

const Authorization: FC = () => {
  const [isHaveAccount, setIsHaveAccount] = useState<Boolean>(true);

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
