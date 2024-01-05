import React from 'react';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Box,
  Button,
  Typography,
  FormHelperText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const GenericForm = ({
  fields,
  values,
  handleChange,
  handleSubmit,
  noSubmit = false,
}) => {
  console.log('values', values);
  console.log('fields', fields);
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'password':
        return (
          <TextField
            fullWidth
            type={field.type === 'password' ? 'password' : 'text'}
            label={field.label}
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            margin="normal"
            disabled={field.disabled}
            error={field.error}
            helperText={field.helperText}
          />
        );

      case 'radio':
        return (
          <RadioGroup
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            row
          >
            {field.options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        );

      case 'number':
        return (
          <TextField
            fullWidth
            type="number"
            label={field.label}
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            margin="normal"
            disabled={field.disabled}
            error={field.error}
            helperText={field.helperText}
            InputProps={{
              inputProps: { min: field.min, max: field.max, step: field.step },
            }}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={field.name}
              value={values[field.name]}
              onChange={handleChange}
              label={field.label}
              error={field.error}
              renderValue={field.renderValue || undefined}
            >
              {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {field.error && <FormHelperText>{field.helperText}</FormHelperText>}
          </FormControl>
        );

      case 'datePicker':
        return (
          <DatePicker
            label={field.label}
            value={values[field.name]}
            onChange={(newValue) =>
              handleChange({ target: { name: field.name, value: newValue } })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ width: '100%' }}
                error={field.error}
                helperText={field.helperText}
              />
            )}
          />
        );

      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={values[field.name]}
                onChange={handleChange}
                name={field.name}
              />
            }
            label={field.label}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {fields.map((field) => (
          <Box key={field.name} sx={{ maxWidth: '60%' }}>
            {renderField(field)}
          </Box>
        ))}

        {!noSubmit && (
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: 5,
              width: 'max-content',
              paddingInline: 5,
            }}
          >
            Submit
          </Button>
        )}
      </Box>
    </form>
  );
};

export default GenericForm;
