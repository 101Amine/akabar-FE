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
import { fetchWithHeaders } from '../../utils/api';
const CreateClient = () => {
  const [clientDetails, setClientDetails] = useState({
    nameClient: '',
    password: '',
    firstName: '',
    lastName: '',
    mobilePhoneNumber: '',
    phone: '',
    fax: '',
    ice: '',
    bankAccount: '',
    address: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
    async (event) => {
      event.preventDefault();
      setSubmitting(true);
      setError(null);

      console.log("clientDetails",clientDetails)
      try {
        const response = await fetchWithHeaders(`/users/client/add`, {
          method: 'POST',
          body: JSON.stringify(clientDetails),
        });

        setSubmitting(false);

        if (response.status === 200) {
          setSuccess(true);
        } else {
          setError('Failed to add client. Please try again.');
        }
      } catch (error) {
        setSubmitting(false);
        setError('Failed to add client. Please try again.');
      }
    },
    [clientDetails]
  );

  return (
    <Container maxWidth="xl">
      <Box marginTop={8}>
      <Typography variant="h4" gutterBottom>
        Create Client
      </Typography>
      <Divider />
      <Box justifyContent="center" mt={4}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} padding={2} display='flex' flexDirection='column'>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Nom du client"
                name="nameClient"
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
                label="Nom"
                name="firstName"
                onChange={handleChange}
                required
                value={clientDetails.firstName}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Prenom"
                name="lastName"
                onChange={handleChange}
                required
                value={clientDetails.lastName}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Téléphone"
                name="mobilePhoneNumber"
                onChange={handleChange}
                value={clientDetails.mobilePhoneNumber}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Téléphone Fix"
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
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          {submitting && <Typography variant="body2">Submitting...</Typography>}
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          {success && <Typography variant="body2" color="success">Client added successfully!</Typography>}
        </Box>
      </Box>
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