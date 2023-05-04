import React from 'react';
import { useFormik } from 'formik';
import { registrationSchema } from '../../utils/validation';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CustomeField } from '../../components/Form/CustomeField';
import { BoolChanger } from '../../types/TotalTypes';

interface RegistrationUIProps {
  setIsHaveAccount: BoolChanger;
}

export const RegistrationUI: React.FC<RegistrationUIProps> = ({ setIsHaveAccount }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: registrationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="authorization__form">
      <AccountCircleIcon fontSize="large" />
      <h2 className="authorization__title">Регистрация</h2>
      <button onClick={() => setIsHaveAccount(true)} className="authorization__subtitle">
        У меня уже есть аккаунт
      </button>
      <CustomeField formik={formik} name="firstName" label="Ваше имя" />
      <CustomeField formik={formik} name="lastName" label="Ваша фамилия" />
      <CustomeField formik={formik} name="email" label="Введите email" />
      <CustomeField formik={formik} name="password" label="Введите пароль" isPassword />
      <CustomeField formik={formik} name="confirmPassword" label="Подтвердите пароль" isPassword />
      <Button type="submit" variant="contained">
        Зарегистрироваться
      </Button>
    </form>
  );
};
