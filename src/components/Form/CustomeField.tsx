import { FC, useState, MouseEvent } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { FormikValues } from 'formik';

interface CustomeFieldProps {
  formik: FormikValues;
  name: string;
  label: string;
  isPassword?: Boolean;
}

export const CustomeField: FC<CustomeFieldProps> = ({
  formik,
  name,
  label,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      {...formik.getFieldProps(name)}
      error={formik.touched[name] && !!formik.errors[name]}
      helperText={formik.errors[name]}
      required
      fullWidth
      label={label}
      type={isPassword && !showPassword ? 'password' : 'text'}
      variant="outlined"
      InputProps={{
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};
