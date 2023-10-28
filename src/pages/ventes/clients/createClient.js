import { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  TextField,
  Grid,
  Container,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  setClientDetails,
  addClient,
  clearClientDetails,
} from '../../../redux/clientSlice';
import { useRouter } from 'next/router';

const CreateClient = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // State
  const { clientDetails, submitting, error, success } = useSelector(
    (state) => state.client,
  );

  // Local State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  // Handlers
  const handleChange = useCallback(
    (event) => {
      dispatch(
        setClientDetails({
          ...clientDetails,
          [event.target.name]: event.target.value,
        }),
      );
    },
    [clientDetails, dispatch],
  );

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    dispatch(clearClientDetails());
  }, [dispatch]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(addClient(clientDetails));

      if (success) {
        router.push('/ventes/clients');
      }
    },
    [clientDetails, dispatch, router, success],
  );

  useEffect(() => {
    if (success && submitting) {
      handleSnackbarOpen('Client ajouté avec succès !', 'success');
    } else if (error && submitting) {
      handleSnackbarOpen(
        "Échec de l'ajout d'un client. Veuillez réessayer.",
        'error',
      );
    }
  }, [success, error, submitting]);

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Container
      maxWidth={isIconOnly ? 'false' : 'xl'}
      style={{ marginLeft: isIconOnly ? '-100px' : '50px', marginTop: '50px' }}
    >
      <Button
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ position: 'absolute' }}
      >
        Back
      </Button>
      <Box marginTop={8}>
        <Typography variant="h4" gutterBottom marginTop="80px">
          Créer un client
        </Typography>
        <Divider />
        <Box justifyContent="center" mt={4}>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid
              container
              spacing={3}
              padding={2}
              display="flex"
              flexDirection="column"
            >
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Nom du client"
                  name="nameClient"
                  onChange={handleChange}
                  required
                  value={clientDetails.nameClient}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={clientDetails.email}
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
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity={snackbarSeverity} // Use the snackbarSeverity state variable
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

CreateClient.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateClient;
