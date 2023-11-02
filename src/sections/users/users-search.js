import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Stack,
  Box,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useState } from 'react';

export const UsersFilters = ({
  filters,
  onFilterChange,
  onFilterSubmit,
  setHasInteractedWithStatus,
}) => {
  const handleInputChange = (filterKey, value) => {
    console.log('filterKey', filterKey);
    console.log('value', value);
    onFilterChange(filterKey, value);
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <OutlinedInput
          fullWidth
          placeholder="Rechercher par prénom"
          value={filters.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
        <OutlinedInput
          fullWidth
          placeholder="Rechercher par nom"
          value={filters.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
        <OutlinedInput
          fullWidth
          placeholder="Rechercher par e-mail"
          value={filters.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
        <FormControl fullWidth variant="outlined">
          {!isFocused && (
            <InputLabel id="status-select-label">Status</InputLabel>
          )}
          <Select
            value={filters.active}
            onChange={(e) => {
              setHasInteractedWithStatus(true);
              handleInputChange('active', e.target.value);
            }}
            labelId="status-select-label"
            label={!isFocused ? 'Status' : ''}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <MenuItem value={'ALL'}>ALL</MenuItem>
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Bloqué</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Box marginTop={'40px'} sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          onClick={onFilterSubmit}
          variant="contained"
          color="primary"
          sx={{ width: '100px' }}
        >
          Chercher
        </Button>
      </Box>
    </Card>
  );
};
