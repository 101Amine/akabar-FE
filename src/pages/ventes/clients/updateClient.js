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
import { updateClientlientValidationSchema } from '../../../utils/validationService';

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
  const [formErrors, setFormErrors] = useState({});

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

      updateClientlientValidationSchema
        .validate(clientDetails, { abortEarly: false })
        .then(() => {
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
        })
        .catch((err) => {
          let errors = {};
          err.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          setFormErrors(errors);
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
        Retour
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
                  label="Nom du client"
                  name="nameClient"
                  onChange={handleChange}
                  required
                  value={clientDetails.nameClient}
                  error={Boolean(formErrors.nameClient)}
                  helperText={formErrors.nameClient}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Code du client"
                  name="codeClient"
                  onChange={handleChange}
                  required
                  value={clientDetails.codeClient}
                  error={Boolean(formErrors.codeClient)}
                  helperText={formErrors.codeClient}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="ice"
                  name="ice"
                  onChange={handleChange}
                  value={clientDetails.ice}
                  error={Boolean(formErrors.ice)}
                  helperText={formErrors.ice}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Telephone"
                  name="phone"
                  onChange={handleChange}
                  value={clientDetails.phone}
                  error={Boolean(formErrors.phone)}
                  helperText={formErrors.phone}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Fax"
                  name="fax"
                  onChange={handleChange}
                  value={clientDetails.fax}
                  error={Boolean(formErrors.fax)}
                  helperText={formErrors.fax}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Compte bancaire"
                  name="bankAccount"
                  onChange={handleChange}
                  value={clientDetails.bankAccount}
                  error={Boolean(formErrors.bankAccount)}
                  helperText={formErrors.bankAccount}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Addrese"
                  name="address"
                  onChange={handleChange}
                  value={clientDetails.address}
                  error={Boolean(formErrors.address)}
                  helperText={formErrors.address}
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
