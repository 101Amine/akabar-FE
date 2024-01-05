import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormHelperText from '@mui/material/FormHelperText';
import { fetchClients } from '../../../redux/clientSlice';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { affaireSelectionValidationSchema } from '../../../utils/validationService';
import { useAffaireDetailsHandler } from '../../../utils/handlers';
import BackButton from '../../../components/utils/BackButton';
import { ClientFilters } from '../../../sections/clients/client-filters';
import { SelectDialog } from '../../../components/Dialogs/selectDialog';
import { useItemsFilters } from '../../../hooks/useItemsFilters';

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedClient, setSelectedClient] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectDate, setSelectedDate] = useState(new Date());
  const [openDialogClients, setOpenDialogClients] = useState(false);

  const [clientFilters, setClientFilters] = useState({
    nameClient: '',
    codeClient: '',
    ice: '',
  });

  const { affaireDetails, submitting, error, success } = useSelector(
    (state) => state.affaire,
  );
  const [formErrors, setFormErrors] = useState({});
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const handleAffaireDetailsChange = useAffaireDetailsHandler(
    affaireDetails,
    dispatch,
  );

  const { fetchFilteredItems } = useItemsFilters({
    filters: clientFilters,
    setFilters: setClientFilters,
    dispatch,
    fetchAction: fetchClients,
  });

  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    handleAffaireDetailsChange('date', today);
  }, []);

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (affaireDetails.clientName === '' && !selectedClient) {
      handleSnackbarOpen(
        'Un client doit être sélectionné pour continuer.',
        'error',
      );
      return;
    }

    try {
      await affaireSelectionValidationSchema.validate(affaireDetails, {
        abortEarly: false,
      });

      if (selectedClient?.id) {
        handleAffaireDetailsChange('clientId', selectedClient.id);
        await router.push('/production/affaires/createAffaire');
      } else {
        handleSnackbarOpen(
          'Échec Lors de la vérification des champs. Veuillez réessayer !',
          'error',
        );
      }
    } catch (error) {
      if (error.inner) {
        let errors = {};
        error.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setFormErrors(errors);
      } else {
        handleSnackbarOpen(
          'Échec de la mise à jour du client. Veuillez réessayer !',
          'error',
        );
      }
    }
  };

  const handleRowClick = (client) => {
    setSelectedClient(client);
    setOpenDialogClients(false);
    handleAffaireDetailsChange('clientName', client.nameClient);
  };

  const handleOpenDialog = () => {
    setOpenDialogClients(true);
    dispatch(fetchClients({}));
    setClientFilters({
      nameClient: '',
      codeClient: '',
      ice: '',
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container
        maxWidth={isIconOnly ? 'false' : 'xl'}
        style={{
          marginLeft: isIconOnly ? '-100px' : '50px',
          marginTop: '50px',
        }}
      >
        <Box mb={10}>
          <BackButton />
        </Box>
        <Stack>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom marginBottom={'50px'}>
                Sélectionner une affaire
              </Typography>

              <Box
                width="50%"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px',
                }}
              >
                <Button
                  onClick={() => handleOpenDialog()}
                  color="primary"
                  sx={{
                    width: '50%',
                    backgroundColor: 'primary.main',
                    color: '#fff',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }}
                >
                  {affaireDetails.clientName ? (
                    <EditIcon sx={{ marginRight: '8px' }} />
                  ) : null}
                  {affaireDetails.clientName
                    ? 'Changer le client'
                    : 'Sélectionner un client'}
                </Button>

                <SelectDialog
                  openDialog={openDialogClients}
                  setCloseDialog={() => setOpenDialogClients(false)}
                  setOpenDialog={() => setOpenDialogClients(true)}
                  fetchDataAction={fetchClients}
                  filterComponent={ClientFilters}
                  filters={clientFilters}
                  setFilters={setClientFilters}
                  dataSelector={(state) => state.client.clients}
                  totalDataSelector={(state) => state.client.totalClients}
                  columns={[
                    { key: 'nameClient', label: 'Nom de client' },
                    { key: 'codeClient', label: 'Code du client' },
                    { key: 'ice', label: 'ICE' },
                  ]}
                  entity="client"
                  pageTitle="Sélectionner un client"
                  onItemSelect={handleRowClick}
                  fetchFilteredItems={fetchFilteredItems}
                />

                {affaireDetails.clientName && (
                  <TextField
                    fullWidth
                    label="Client sélectionné"
                    value={
                      affaireDetails.clientName ? affaireDetails.clientName : ''
                    }
                    error={Boolean(formErrors.clientName)}
                    helperText={formErrors.clientName}
                    disabled
                  />
                )}

                <DatePicker
                  value={
                    affaireDetails.date ? dayjs(affaireDetails.date) : dayjs()
                  }
                  label="Select Date"
                  format="DD/MM/YYYY"
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) => {
                    const formattedDateTime = newValue.format(
                      'YYYY-MM-DDTHH:mm:ss',
                    );

                    setSelectedDate(newValue);
                    handleAffaireDetailsChange('date', formattedDateTime);
                  }}
                />

                <Select
                  value={affaireDetails.productType}
                  error={Boolean(formErrors.productType)}
                  onChange={(e) =>
                    handleAffaireDetailsChange('productType', e.target.value)
                  }
                  name="type"
                  displayEmpty
                  fullWidth
                  renderValue={(selectedValue) => (
                    <Typography
                      variant="body2"
                      sx={
                        !selectedValue
                          ? {
                              opacity: 0.6,
                              fontSize: 14,
                              fontWeight: 600,
                            }
                          : {
                              opacity: 0.9,
                              fontWeight: 600,
                            }
                      }
                    >
                      {selectedValue || "Choisir un type d'affaire"}
                    </Typography>
                  )}
                >
                  <MenuItem value={'ETIQUETTE'}>Etiquette</MenuItem>
                  <MenuItem value={'item2'}>Menu item 2</MenuItem>
                  <MenuItem value={'item3'}>Menu item 3</MenuItem>
                  <MenuItem value={'item4'}>Menu item 4</MenuItem>
                  <MenuItem value={'item5'}>Menu item 5</MenuItem>
                </Select>
                {formErrors.productType && (
                  <FormHelperText
                    error={Boolean(formErrors.productType)}
                    sx={{ mt: -3, ml: 2 }}
                  >
                    {formErrors.productType}
                  </FormHelperText>
                )}

                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  style={{ maxWidth: '100px' }}
                >
                  Suivant
                </Button>

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
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </LocalizationProvider>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
