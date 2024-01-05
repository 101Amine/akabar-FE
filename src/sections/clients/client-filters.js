import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Stack,
  Button,
  Box,
} from '@mui/material';

export const ClientFilters = ({ filters, onFilterChange, onFilterSubmit }) => {
  const handleInputChange = (filterKey, value) => {
    onFilterChange(filterKey, value);
  };

  const handleFilterSubmit = () => {
    onFilterSubmit();
  };

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <OutlinedInput
          fullWidth
          placeholder="Rechercher par nom"
          value={filters.nameClient}
          onChange={(e) => handleInputChange('nameClient', e.target.value)}
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
          placeholder="Rechercher par code"
          value={filters.codeClient}
          onChange={(e) => handleInputChange('codeClient', e.target.value)}
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
          placeholder="Rechercher par ICE"
          value={filters.ice}
          onChange={(e) => handleInputChange('ice', e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
      </Stack>
      <Box marginTop={'40px'} sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          onClick={handleFilterSubmit}
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
