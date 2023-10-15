import {
  Box, 
  Button, 
  Container, 
  Stack, 
  Typography, 
  Select, 
  MenuItem
} from '@mui/material';
import { useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';

const Page = () => {
  const [affaireType, setAffaireType] = useState(''); // state for selected affaire type
  const router = useRouter();

  const handleAffaireChange = (event) => {
    setAffaireType(event.target.value);
  };

  const proceedToForm = () => {
    router.push('/affaires/createAffaire');
  };

  return (
    <>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Typography 
          variant="h4" 
          gutterBottom>
            Affaires
          </Typography>

          <Select
              value={affaireType}
              onChange={handleAffaireChange}
              displayEmpty
              fullWidth
              renderValue={(selectedValue) => selectedValue || "Choisir un type d'affaire"}
          >
              <MenuItem value={"Etiquette"}>Etiquette</MenuItem>
              <MenuItem value={"item2"}>Menu item 2</MenuItem>
              <MenuItem value={"item3"}>Menu item 3</MenuItem>
              <MenuItem value={"item4"}>Menu item 4</MenuItem>
              <MenuItem value={"item5"}>Menu item 5</MenuItem>
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

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
