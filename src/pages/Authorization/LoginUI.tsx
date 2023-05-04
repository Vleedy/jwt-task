import { FC } from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../../utils/validation';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { testService } from '../../services/testService';
import { CustomeField } from '../../components/Form/CustomeField';
import { BoolChanger } from '../../types/TotalTypes';

interface LoginUIProps {
  setIsHaveAccount: BoolChanger;
}

export const LoginUI: FC<LoginUIProps> = ({ setIsHaveAccount }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const response = await testService.testLogin(values.email, values.password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('time', response.data.time);
    },
    validationSchema: loginSchema,
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
      <CustomeField label="Введите email" name="email" formik={formik} />
      <CustomeField label="Введите пароль" name="password" formik={formik} isPassword />
      <Button type="submit" variant="contained">
        Войти
      </Button>
    </form>
  );
};
