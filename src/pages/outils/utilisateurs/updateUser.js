import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  CardActions,
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
import { updateUser } from '../../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserValidationSchema } from '../../../utils/validationService';

const UpdateUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  const { user: userJSON } = router.query;

  const initialUserDetails = userJSON
    ? JSON.parse(userJSON)
    : {
        userName: '',
        password: '',
        phoneNumber: '',
      };

  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (userJSON) {
      setUserDetails(JSON.parse(userJSON));
    }
  }, [userJSON]);

  const handleChange = useCallback((event) => {
    console.log('event target value', event.target.name);
    setUserDetails((prevState) => ({
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

  const [errors, setErrors] = useState({}); // State for validation errors

  const validate = async () => {
    try {
      await updateUserValidationSchema.validate(userDetails, {
        abortEarly: false,
      });
      return true;
    } catch (validationErrors) {
      const yupErrors = {};
      validationErrors.inner.forEach((error) => {
        yupErrors[error.path] = error.message;
      });
      setErrors(yupErrors);
      return false;
    }
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setSubmitting(true);

      const isValid = await validate();
      if (!isValid) {
        setSubmitting(false);
        return;
      }

      try {
        const resultAction = await dispatch(updateUser(userDetails));

        setSubmitting(false);

        if (updateUser.fulfilled.match(resultAction)) {
          handleSnackbarOpen('User updated successfully!', 'success');
          router.push('/outils/users');
        } else {
          handleSnackbarOpen(
            'Failed to update user. Please try again!',
            'error',
          );
        }
      } catch (error) {
        setSubmitting(false);
      }
    },
    [dispatch, userDetails],
  );

  return (
    <Container
      maxWidth={isIconOnly ? 'false' : 'xl'}
      style={{ marginLeft: isIconOnly ? '-100px' : '50px', marginTop: '70px' }}
    >
      {' '}
      <Button
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ position: 'absolute' }}
      >
        Retour
      </Button>
      <Box marginTop={'80px'}>
        <Typography variant="h4" marginTop="40px" gutterBottom>
          Mettre à jour l'utilisateur
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
                  error={!!errors.firstName}
                  helperText={errors.firstName}
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
                  error={!!errors.lastName}
                  helperText={errors.lastName}
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
                  error={!!errors.email}
                  helperText={errors.email}
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
                  error={!!errors.mobilePhoneNumber}
                  helperText={errors.mobilePhoneNumber}
                />
              </Grid>
            </Grid>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                Mise à jour
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
      </Box>
    </Container>
  );
};

UpdateUser.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UpdateUser;
