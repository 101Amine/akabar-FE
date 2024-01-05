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
import { createAgentValidationSchema } from '../../../utils/validationService';
import {
  addAgent,
  updateAgent,
  getAgentDetails,
  clearAgentDetails,
  setAgentDetails,
} from '../../../redux/agentSlice';
import { findOneEntity } from '../../../redux/utils/findOneEntity';

const redirectURL = '/ventes/agents';

const AgentForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query; // Get agent ID from URL
  const isUpdateMode = Boolean(id); // Determine mode based on the presence of agent ID
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const agentDetailsSelector = (state) => state.agent.agentDetails;
  const agentDetails = useSelector(agentDetailsSelector);

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(
        findOneEntity({
          entityType: 'agent',
          url: '/agent/find',
          id,
        }),
      );
    } else {
      dispatch(clearAgentDetails());
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
    clearAgentDetails,
    isUpdateMode ? updateAgent : addAgent,
    agentDetailsSelector,
    createAgentValidationSchema,
    setAgentDetails,
    redirectURL,
  );

  const formFields = [
    {
      type: 'text',
      name: 'code',
      label: "Code d'agent",
      error: Boolean(formErrors.code),
      helperText: formErrors.code,
    },
    {
      type: 'text',
      name: 'name',
      label: "Nom d'agent",
      required: true,
      error: Boolean(formErrors.name),
      helperText: formErrors.name,
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
          {isUpdateMode ? 'Modifier' : 'Créer'} un agent
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
              values={agentDetails}
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

AgentForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AgentForm;
