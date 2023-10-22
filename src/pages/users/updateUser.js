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
  Typography
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { fetchWithHeaders } from '../../utils/api';

const UpdateUser = () => {
  const router = useRouter();

  const { user: userJSON } = router.query;

  const initialUserDetails = userJSON
    ? JSON.parse(userJSON)
    : {
      userName: '',
      password: '',
      phoneNumber: ''
    };

  const [userDetails, setUserDetails] = useState(initialUserDetails);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userJSON) {
      setUserDetails(JSON.parse(userJSON));
    }
  }, [userJSON]);

  useEffect(() => {
    console.log("userDetails",userDetails)
  }, [userDetails]);


  // Handle changes to the form's input fields
  const handleChange = useCallback(
    (event) => {
      setUserDetails((prevState) => ({
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

      try {
        await fetchWithHeaders(`/users/profile`, {
          method: 'POST',
          body: JSON.stringify(userDetails)
        });
        setSubmitting(false);
        setSuccess(true);
      } catch (error) {
        setSubmitting(false);
        setError(error.message);
      }
    },
    [userDetails]
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" marginTop='40px' gutterBottom>
        Update User
      </Typography>
      <Divider />
      <Box marginInline='50px' justifyContent="center" mt={4}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} padding={2} display='flex' flexDirection='column'>
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
                name="phoneNumber"
                onChange={handleChange}
                required
                type="tel"
                value={userDetails.mobilePhoneNumber}
              />
            </Grid>
          </Grid>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" type="submit" disabled={submitting}>
              Update
            </Button>
          </CardActions>
        </form>
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          {submitting && <Typography variant="body2">Updating...</Typography>}
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          {success && <Typography variant="body2" color="success">User updated successfully!</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

UpdateUser.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default UpdateUser;
