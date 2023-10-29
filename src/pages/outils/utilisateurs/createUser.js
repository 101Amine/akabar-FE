import { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Grid,
  Container,
  Typography,
  Stack,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUser,
  clearUserDetails,
  setUserDetails,
} from '../../../redux/userSlice';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import createClientValidationSchema from '../../../utils/validationService';

const CreateUser = () => {
  const dispatch = useDispatch();
  const { userDetails, submitting, error, success } = useSelector(
    (state) => state.user,
  );
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const router = useRouter();

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      if (name === 'passwordConfirmation') {
        setPasswordConfirmation(value);
      } else {
        dispatch(
          setUserDetails({
            ...userDetails,
            [name]: value,
          }),
        );
      }
    },
    [userDetails, dispatch],
  );

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      // Check if passwords match
      if (userDetails.password !== passwordConfirmation) {
        handleSnackbarOpen(
          'Les deux mots de passe ne correspondent pas, veuillez les répéter.',
          'error',
        );
        return;
      }

      createClientValidationSchema
        .validate(userDetails, { abortEarly: false })
        .then(() => {
          dispatch(addUser(userDetails));

          console.log('success', success);
          if (success && !submitting) {
            router.push('/outils/utilisateurs');
            handleSnackbarOpen(
              "L'utilisateur a été ajouté avec succès !",
              'success',
            );
          } else {
            handleSnackbarOpen(
              "L'ajout d'un utilisateur a échoué. Veuillez réessayer.",
              'error',
            );
          }
        })
        .catch((err) => {
          let errors = {};
          err.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          setFormErrors(errors);
        });
    },
    [userDetails, dispatch, router, success],
  );

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    dispatch(clearUserDetails());
  }, [dispatch]);

  return (
    <Container
      maxWidth={isIconOnly ? 'false' : 'xl'}
      style={{ marginLeft: isIconOnly ? '-100px' : '50px', marginTop: '50px' }}
    >
      <Stack spacing={3}>
        <Button
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          sx={{ position: 'absolute' }}
        >
          Retour
        </Button>
      </Stack>

      <Typography variant="h4" marginTop="80px" gutterBottom>
        Créer un utilisateur
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
                value={userDetails.firstName}
                error={Boolean(formErrors.firstName)}
                helperText={formErrors.firstName}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Prenom"
                name="lastName"
                onChange={handleChange}
                required
                value={userDetails.lastName}
                error={Boolean(formErrors.lastName)}
                helperText={formErrors.lastName}
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
                value={userDetails.password}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Confirmer le mot de passe"
                name="passwordConfirmation"
                onChange={handleChange}
                required
                type="password"
                value={passwordConfirmation}
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
                value={userDetails.email}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Numéro de téléphone"
                name="mobilePhoneNumber"
                onChange={handleChange}
                required
                type="tel"
                value={userDetails.mobilePhoneNumber}
                error={Boolean(formErrors.mobilePhoneNumber)}
                helperText={formErrors.mobilePhoneNumber}
              />
            </Grid>
          </Grid>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              // disabled={submitting}
            >
              Soumettre
            </Button>
          </CardActions>
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
    </Container>
  );
};

CreateUser.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateUser;
