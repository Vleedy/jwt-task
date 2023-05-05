import * as Yup from 'yup';

export const registrationSchema = Yup.object({
  firstName: Yup.string()
    .required('Поле обязательно для заполнения')
    .min(2, 'Имя должно содержать не менее 2 символов')
    .max(15, 'Имя должно содержать не более 15 символов'),
  lastName: Yup.string()
    .required('Поле обязательно для заполнения')
    .min(2, 'Фамилия должна содержать не менее 2 символов')
    .max(15, 'Фамилия должна содержать не более 15 символов'),
  login: Yup.string()
    .min(5, 'Имя пользователя должно содержать не менее 5 символов')
    .max(25, 'Имя пользователя должно содержать не более 25 символов')
    .matches(/^[a-zA-Z0-9]+$/, 'Имя пользователя должно содержать только латиницу и цифры')
    .required('Поле обязательно для заполнения'),
  password: Yup.string()
    .required('Поле обязательно для заполнения')
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .max(24, 'Пароль должен содержать не более 24 символов')
    .matches(
      /^(?=.*[A-Z])[A-Za-z0-9]+$/,
      'Пароль должен содержать только цифры и латиницу, а также иметь хотя бы одну заглавную букву'
    ),
  confirmPassword: Yup.string()
    .required('Поле обязательно для заполнения')
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});

export const loginSchema = Yup.object({
  login: Yup.string()
    .min(5, 'Имя пользователя должно содержать не менее 5 символов')
    .max(25, 'Имя пользователя должно содержать не более 25 символов')
    .matches(/^[a-zA-Z0-9]+$/, 'Имя пользователя должно содержать только латиницу и цифры')
    .required('Поле обязательно для заполнения'),
  password: Yup.string()
    .required('Поле обязательно для заполнения')
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .max(24, 'Пароль должен содержать не более 24 символов')
    .matches(
      /^(?=.*[A-Z])[A-Za-z0-9]+$/,
      'Пароль должен содержать только цифры и латиницу, а также иметь хотя бы одну заглавную букву'
    ),
});
