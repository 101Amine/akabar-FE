import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
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
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { updateClient } from '../../../redux/clientSlice';
import { useDispatch, useSelector } from 'react-redux';

const UpdateClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Fetch client details from the router's query
  const { client: clientJSON } = router.query;
  const initialClientDetails = clientJSON ? JSON.parse(clientJSON) : {};

  const [clientDetails, setClientDetails] = useState(initialClientDetails);
  const [submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  // Update clientDetails state when the router's query changes
  useEffect(() => {
    if (clientJSON) {
      setClientDetails(JSON.parse(clientJSON));
    }
  }, [clientJSON]);

  const handleChange = useCallback((event) => {
    setClientDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setSubmitting(true);
      dispatch(updateClient(clientDetails))
        .then((responseAction) => {
          if (updateClient.fulfilled.match(responseAction)) {
            handleSnackbarOpen(
              'Le client a été mis à jour avec succès !',
              'success',
            );
            router.push('/ventes/clients');
            setSubmitting(false);
          } else {
            handleSnackbarOpen(
              'Échec de la mise à jour du client. Veuillez réessayer !',
              'error',
            );
          }
        })
        .catch((error) => {
          setSubmitting(false);
          handleSnackbarOpen(
            'Échec de la mise à jour du client. Veuillez réessayer !',
            'error',
          );
        });
    },
    [clientDetails, dispatch],
  );

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
        <Typography variant="h4" gutterBottom marginTop={'100px'}>
          Mise à jour du client
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
                  label="Téléphone"
                  name="mobilePhoneNumber"
                  onChange={handleChange}
                  value={clientDetails.mobilePhoneNumber}
                />
              </Grid>
            </Grid>
            <Divider />
            <Divider />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Mise à jour
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

UpdateClient.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UpdateClient;
