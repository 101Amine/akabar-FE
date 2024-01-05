import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import GenericForm from '../../../components/Generics/GenericForm';
import BackButton from '../../../components/utils/BackButton';
import { useCreateForm } from '../../../hooks/useCreateForm';
import { userValidationSchema } from '../../../utils/validationService';
import {
  addUser,
  updateUser,
  getUserDetails,
  clearUserDetails,
  setUserDetails,
} from '../../../redux/userSlice';
import { findOneEntity } from '../../../redux/utils/findOneEntity';

const UserForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const isUpdateMode = Boolean(id);
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const userDetails = useSelector((state) => state.user.userDetails);
  const redirectURL = '/outils/utilisateurs';

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(
        findOneEntity({
          entityType: 'user',
          url: '/users/find',
          id,
        }),
      );
    } else {
      dispatch(clearUserDetails());
    }
  }, [dispatch, id, isUpdateMode]);

  const {
    handleChange,
    handleSubmit,
    formErrors,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    snackbarSeverity,
  } = useCreateForm(
    clearUserDetails,
    isUpdateMode ? updateUser : addUser,
    (state) => state.user.userDetails,
    userValidationSchema,
    (details) => dispatch(setUserDetails(details)),
    redirectURL,
  );

  const formFields = [
    {
      type: 'text',
      name: 'firstName',
      label: 'Nom',
      error: Boolean(formErrors.firstName),
      helperText: formErrors.firstName,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Prénom',
      error: Boolean(formErrors.lastName),
      helperText: formErrors.lastName,
    },
    {
      type: 'password',
      name: 'password',
      label: 'Mot de passe',
      error: Boolean(formErrors.password),
      helperText: formErrors.password,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      error: Boolean(formErrors.email),
      helperText: formErrors.email,
    },
    {
      type: 'text',
      name: 'mobilePhoneNumber',
      label: 'Numéro de téléphone',
      error: Boolean(formErrors.mobilePhoneNumber),
      helperText: formErrors.mobilePhoneNumber,
    },
  ];

  return (
    <Container
      maxWidth={isIconOnly ? 'false' : 'xl'}
      style={{ marginLeft: isIconOnly ? '-100px' : '50px', marginTop: '50px' }}
    >
      <BackButton />
      <Box marginTop={8}>
        <Typography variant="h4" gutterBottom sx={{ marginBlock: 5 }}>
          {isUpdateMode ? 'Mettre à jour' : 'Créer'} un utilisateur
        </Typography>

        <Card
          style={{
            width: '50%',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginTop: 5,
          }}
        >
          <CardContent>
            <GenericForm
              fields={formFields}
              values={userDetails}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </CardContent>
        </Card>

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

UserForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UserForm;
