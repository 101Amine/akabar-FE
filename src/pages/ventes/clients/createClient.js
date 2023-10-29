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
import * as Yup from 'yup';
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
import { createClientValidationSchema } from '../../../utils/validationService';

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
  const [formErrors, setFormErrors] = useState({});
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

      createClientValidationSchema
        .validate(clientDetails, { abortEarly: false })
        .then(() => {
          // If validation is successful
          dispatch(addClient(clientDetails));

          if (success) {
            router.push('/ventes/clients');
          }

          if (success) {
            handleSnackbarOpen('Client ajouté avec succès !', 'success');
          } else if (error) {
            handleSnackbarOpen(
              "Échec de l'ajout d'un client. Veuillez réessayer.",
              'error',
            );
          }
        })
        .catch((err) => {
          // If validation fails, set the errors to state
          let errors = {};
          err.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          setFormErrors(errors);
        });
    },
    [clientDetails, dispatch, router, success, submitting],
  );

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Container
      maxWidth={isIconOnly ? 'false' : 'xl'}
      style={{ marginLeft: isIconOnly ? '-100px' : '50px', marginTop: '100px' }}
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
        <Typography variant="h4" gutterBottom marginTop="80px">
          Créer un client{' '}
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
                  label="Téléphone Fix"
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
                  label="ICE"
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
                  label="Adresse"
                  name="address"
                  onChange={handleChange}
                  value={clientDetails.address}
                  error={Boolean(formErrors.address)}
                  helperText={formErrors.address}
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