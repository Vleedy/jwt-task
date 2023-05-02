import React from 'react';
import { useFormik } from 'formik';
import { authorizationSchema } from '../utils/validation';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthService from '../services/AuthService';

interface LoginUIProps {
  setIsHaveAccount: Function;
}

const LoginUI: React.FC<LoginUIProps> = ({ setIsHaveAccount }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const response = await AuthService.test();
      console.log(response);
    },
    validationSchema: authorizationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="authorization__form">
      <AccountCircleIcon fontSize="large" />
      <h2 className="authorization__title">Войдите в аккаунт</h2>
      <button onClick={() => setIsHaveAccount(false)} className="authorization__subtitle">
        Зарегистрироваться
      </button>
      <TextField
        required
        fullWidth
        name="email"
        label="Введите email"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.errors.email}
      />
      <TextField
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        required
        fullWidth
        label="Введите пароль"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        helperText={formik.errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained">
        Войти
      </Button>
    </form>
  );
};

export default LoginUI;
