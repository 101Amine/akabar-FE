import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Box,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import GenericForm from '../../../components/Generics/GenericForm';
import BackButton from '../../../components/utils/BackButton';
import { useCreateForm } from '../../../hooks/useCreateForm';
import { createClientValidationSchema } from '../../../utils/validationService';
import {
  addClient,
  updateClient,
  getClientDetails,
  clearClientDetails,
  setClientDetails,
} from '../../../redux/clientSlice';
import { findOneEntity } from '../../../redux/utils/findOneEntity';

const redirectURL = '/ventes/clients';

const ClientForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const isUpdateMode = Boolean(id);
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const clientDetailsSelector = (state) => state.client.clientDetails;
  const clientDetails = useSelector(clientDetailsSelector);

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(
        findOneEntity({
          entityType: 'client',
          url: '/users/client/find',
          id,
        }),
      );
    } else {
      dispatch(clearClientDetails());
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
    clearClientDetails,
    isUpdateMode ? updateClient : addClient,
    clientDetailsSelector,
    createClientValidationSchema,
    setClientDetails,
    redirectURL,
  );

  const formFields = [
    {
      type: 'text',
      name: 'codeClient',
      label: 'Code du client',
      error: Boolean(formErrors.codeClient),
      helperText: formErrors.codeClient,
    },
    {
      type: 'text',
      name: 'nameClient',
      label: 'Nom du client',
      required: true,
      error: Boolean(formErrors.nameClient),
      helperText: formErrors.nameClient,
    },
    {
      type: 'text',
      name: 'phone',
      label: 'Téléphone Fix',
      error: Boolean(formErrors.phone),
      helperText: formErrors.phone,
    },
    {
      type: 'text',
      name: 'fax',
      label: 'Fax',
      error: Boolean(formErrors.fax),
      helperText: formErrors.fax,
    },
    {
      type: 'text',
      name: 'ice',
      label: 'ICE',
      error: Boolean(formErrors.ice),
      helperText: formErrors.ice,
    },
    {
      type: 'text',
      name: 'bankAccount',
      label: 'Compte bancaire',
      error: Boolean(formErrors.bankAccount),
      helperText: formErrors.bankAccount,
    },
    {
      type: 'text',
      name: 'address',
      label: 'Adresse',
      error: Boolean(formErrors.address),
      helperText: formErrors.address,
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
          {isUpdateMode ? 'Modifier' : 'Créer'} un client
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
              values={clientDetails}
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

ClientForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ClientForm;
