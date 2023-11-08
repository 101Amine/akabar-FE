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

export const AffairesFilters = ({
  filters,
  onFilterChange,
  onFilterSubmit,
}) => {
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
          placeholder="Rechercher par nom affaire"
          value={filters.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
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
          placeholder="Rechercher par nom client"
          value={filters.clientName}
          onChange={(e) =>
            handleInputChange('client.nameClient', e.target.value)
          }
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
