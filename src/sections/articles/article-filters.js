import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Stack,
  Button,
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useEffect } from 'react';
import { getArticleFamilies } from '../../redux/articleSlice';
import { useSelector, useDispatch } from 'react-redux';

export const ArticleFilters = ({ filters, onFilterChange, onFilterSubmit }) => {
  const dispatch = useDispatch();

  const families = useSelector((state) => state.article.families);

  useEffect(() => {
    dispatch(getArticleFamilies());
  }, []);

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
          value={filters.name}
          onChange={(e) => handleInputChange('designation', e.target.value)}
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
          value={filters.code}
          onChange={(e) => handleInputChange('code', e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />

        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="family-select-label">Famille</InputLabel>
          <Select
            labelId="family-select-label"
            id="family-select"
            value={filters.family}
            label="Famille"
            onChange={(e) => handleInputChange('family', e.target.value)}
          >
            {families.map((family, index) => (
              <MenuItem key={index} value={family}>
                {family}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
