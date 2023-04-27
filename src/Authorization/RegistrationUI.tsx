import React from 'react';
import { useFormik } from 'formik';
import { registrationSchema } from '../utils/validation';
import {
Button,
IconButton,
InputAdornment,
TextField,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { error } from 'console';

interface RegistrationUIProps {
setIsHaveAccount: Function;
}

const AuthorizationUI: React.FC<RegistrationUIProps> = ({
setIsHaveAccount,
}) => {

const [showPassword, setShowPassword] = React.useState(false);

const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
event.preventDefault();
};

const formik = useFormik({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
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
<TextField
required
fullWidth
id="outlined-adornment-firstname"
name="firstName"
label="Ваше имя"
variant="outlined"
value={formik.values.firstName}
onChange={formik.handleChange}
error={formik.touched.firstName && Boolean(formik.errors.firstName)}
helperText={formik.errors.firstName}
/>
<TextField
required
fullWidth
name="lastName"
label="Ваша фамилия"
variant="outlined"
value={formik.values.lastName}
onChange={formik.handleChange}
error={formik.touched.lastName && Boolean(formik.errors.lastName)}
helperText={formik.errors.lastName}
/>
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
<Button type="submit" variant="contained">Зарегистрироваться</Button>
</form>
);
};

export default AuthorizationUI;