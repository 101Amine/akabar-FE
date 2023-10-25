import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Divider,
  TextField,
  Grid,
  Container,
  Typography
} from '@mui/material';
import { fetchWithHeaders } from '../../utils/api';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const UpdateClient = () => {
  const router = useRouter();

  // Fetch client details from the router's query
  const { client: clientJSON } = router.query;
  const initialClientDetails = clientJSON ? JSON.parse(clientJSON) : {};

  const [clientDetails, setClientDetails] = useState(initialClientDetails);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Update clientDetails state when the router's query changes
  useEffect(() => {
    if (clientJSON) {
      setClientDetails(JSON.parse(clientJSON));
    }
  }, [clientJSON]);

  const handleChange = useCallback((event) => {
    setClientDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }, []);

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };


  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetchWithHeaders(`/users/profile`, {
        method: 'POST',
        body: JSON.stringify(clientDetails)
      });

      setSubmitting(false);

      if (response.status === 200) {
        handleSnackbarOpen('Client added successfully!', 'success');
        setSuccess(true);
      } else {
        setError('Failed to update client. Please try again.');
        handleSnackbarOpen('Failed to update client. Please try again!', 'error');

      }
    } catch (error) {
      setSubmitting(false);
      setError('Failed to update client. Please try again.');
    }
  }, [clientDetails]);

  return (
    <Container maxWidth="xl">
      <Box marginTop={8}>
        <Typography variant="h4" gutterBottom>
          Update Client
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
            <Divider />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </Box>
          </form>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity={snackbarSeverity}
              onClose={() => setSnackbarOpen(false)}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
};

UpdateClient.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default UpdateClient;
