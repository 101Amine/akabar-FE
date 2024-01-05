import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from '@mui/material';

const FormRadioGroup = ({
  name,
  value,
  onChange,
  options,
  error,
  helperText,
}) => (
  <FormControl component="fieldset" error={Boolean(error)}>
    <RadioGroup row value={value} onChange={onChange}>
      {options.map((option, index) => (
        <FormControlLabel
          key={index}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default FormRadioGroup;
