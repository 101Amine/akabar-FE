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
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

const CreateUser = () => {
  const dispatch = useDispatch();
  const { userDetails, submitting, error, success } = useSelector(
    (state) => state.user,
  );
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const router = useRouter();

  const handleChange = useCallback(
    (event) => {
      console.log('name', event.target.name);
      console.log('value', event.target.value);
      dispatch(
        setUserDetails({
          ...userDetails,
          [event.target.name]: event.target.value,
        }),
      );
    },
    [userDetails, dispatch],
  );

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(addUser(userDetails));
      if (success) {
        router.push('/outils/utilisateurs');
      }

      if (success) {
        handleSnackbarOpen(
          "L'utilisateur a été ajouté avec succès !",
          'success',
        );
      } else if (error) {
        handleSnackbarOpen(
          "L'ajout d'un utilisateur a échoué. Veuillez réessayer.",
          'error',
        );
      }
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
