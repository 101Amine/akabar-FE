import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Page = () => {
  const [affaireType, setAffaireType] = useState('');
  const router = useRouter();
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const handleAffaireChange = (event) => {
    setAffaireType(event.target.value);
  };

  const proceedToForm = () => {
    router.push('/ventes/affaires/createAffaire');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Container
        maxWidth={isIconOnly ? 'false' : 'xl'}
        style={{
          marginLeft: isIconOnly ? '-100px' : '50px',
          marginTop: '50px',
        }}
      >
        <Button
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          sx={{ position: 'absolute' }}
        >
          Retour
        </Button>
        <Stack spacing={3} marginTop={8}>
          <Typography variant="h4" gutterBottom marginTop={'50px'}>
            Affaires
          </Typography>

          <Select
            value={affaireType}
            onChange={handleAffaireChange}
            displayEmpty
            fullWidth
            renderValue={(selectedValue) =>
              selectedValue || "Choisir un type d'affaire"
            }
          >
            <MenuItem value={'Etiquette'}>Etiquette</MenuItem>
            <MenuItem value={'item2'}>Menu item 2</MenuItem>
            <MenuItem value={'item3'}>Menu item 3</MenuItem>
            <MenuItem value={'item4'}>Menu item 4</MenuItem>
            <MenuItem value={'item5'}>Menu item 5</MenuItem>
          </Select>

          <Button
            onClick={proceedToForm}
            variant="contained"
            style={{ maxWidth: '100px' }}
          >
            Suivant
          </Button>
        </Stack>
      </Container>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
