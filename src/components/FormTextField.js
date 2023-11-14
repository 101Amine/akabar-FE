import { TextField } from '@mui/material';

const FormTextField = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  disabled,
}) => (
  <TextField
    fullWidth
    label={label}
    value={value}
    name={name}
    onChange={onChange}
    error={Boolean(error)}
    helperText={helperText}
    disabled={disabled}
  />
);

export default FormTextField;
