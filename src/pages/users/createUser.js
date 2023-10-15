import { useCallback, useState } from 'react';
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
  Typography
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const CreateUser = () => {
  const [userDetails, setUserDetails] = useState({
    userName: '',
    password: '',
    phoneNumber: ''
  });

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
    (event) => {
      event.preventDefault();
      // Logic for form submission
    },
    []
  );

  return (
    <Container maxWidth="xl">
    <Typography variant="h4" gutterBottom>
      Create User
    </Typography>
    <Divider />
    <Box marginInline='50px' justifyContent="center" mt={4}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          
            <Grid container spacing={3} padding={2} display='flex' flexDirection='column'>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Nom d'utilisateur"
                  name="userName"
                  onChange={handleChange}
                  required
                  value={userDetails.userName}
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
                  value={userDetails.phoneNumber}
                />
              </Grid>
            </Grid>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" type="submit">
              Soumettre
            </Button>
          </CardActions>
      </form>
    </Box>
    </Container>
  );
};

CreateUser.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CreateUser;
