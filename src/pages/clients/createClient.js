import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  TextField,
  Grid,
  Container,
  Typography
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const CreateClient = () => {
  const [clientDetails, setClientDetails] = useState({
    userName: '',
    password: '',
    email: '',
    phone: '',
    fax: '',
    ice: '',
    bankAccount: '',
    address: ''
  });

  const handleChange = useCallback(
    (event) => {
      setClientDetails((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      // Logic for form submission
    },
    []
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Create Client
      </Typography>
      <Divider />
      <Box ustifyContent="center" mt={4}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} padding={2} display='flex' flexDirection='column'>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Nom d'utilisateur"
                name="userName"
                onChange={handleChange}
                required
                value={clientDetails.userName}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Mot de passe"
                name="password"
                onChange={handleChange}
                required
                type="password"
                value={clientDetails.password}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
                required
                type="email"
                value={clientDetails.email}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Téléphone"
                name="phone"
                onChange={handleChange}
                value={clientDetails.phone}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Fax"
                name="fax"
                onChange={handleChange}
                value={clientDetails.fax}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="ICE"
                name="ice"
                onChange={handleChange}
                value={clientDetails.ice}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Compte bancaire"
                name="bankAccount"
                onChange={handleChange}
                value={clientDetails.bankAccount}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Adresse"
                name="address"
                onChange={handleChange}
                value={clientDetails.address}
              />
            </Grid>
          </Grid>
          <Divider />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Soumettre
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

CreateClient.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CreateClient;