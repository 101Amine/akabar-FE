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
import { useCallback, useEffect, useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ClientFilters } from '../../../sections/clients/client-search';
import { DataTable } from '../../../sections/DataTable/data-table';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormHelperText from '@mui/material/FormHelperText';

import {
  fetchClients,
  setPage,
  setRowsPerPage,
  updateClient,
} from '../../../redux/clientSlice';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { useClientFilters } from '../../../hooks/useClientFilters';
import BackButton from '../../../components/BackButton';
import { setAffaireDetails } from '../../../redux/affaireSlice';
import Snackbar from '@mui/material/Snackbar';
import {
  affaireSelectionValidationSchema,
  updateClientlientValidationSchema,
} from '../../../utils/validationService';
import MuiAlert from '@mui/material/Alert';

const Page = () => {
  const dispatch = useDispatch();

  const [affaireName, setAffaireName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const page = useSelector((state) => state.client.page);
  const totalClients = useSelector((state) => state.client.totalClients);
  const clients = useSelector((state) => state.client.clients);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectDate, setSelectedDate] = useState(new Date());
  const { affaireDetails, submitting, error, success } = useSelector(
    (state) => state.affaire,
  );
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  useEffect(() => {
    console.log('formErrors', formErrors);
  }, [formErrors]);

  useEffect(() => {
    console.log('affaireDetails', affaireDetails);
  }, [affaireDetails]);

  const { filters, setFilters, fetchFilteredClients } = useClientFilters();

  const handleAffaireDetailsChange = useCallback(
    (nameOrEvent, value) => {
      let newName, newValue;

      if (nameOrEvent && nameOrEvent.target) {
        newName = nameOrEvent.target.name;
        newValue = nameOrEvent.target.value;
      } else {
        newName = nameOrEvent;
        newValue = value;
      }

      dispatch(setAffaireDetails({ ...affaireDetails, [newName]: newValue }));
    },
    [affaireDetails, dispatch],
  );

  const handlePageChange = useCallback(
    (event) => {
      dispatch(setPage(event));
      dispatch(fetchClients({}));
    },
    [dispatch],
  );

  const handleRowsPerPageChange = useCallback(
    (value) => {
      dispatch(setRowsPerPage(value));
      dispatch(fetchClients({}));
    },
    [dispatch],
  );

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (affaireDetails.clientName === '' || !selectedClient) {
        handleSnackbarOpen(
          'Un client doit être sélectionné pour continuer.',
          'error',
        );
        return;
      }

      try {
        const validDetails = await affaireSelectionValidationSchema.validate(
          affaireDetails,
          { abortEarly: false },
        );
        // Assuming that the function that initiates the update client request returns a promise

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
        // Assuming the error object has an 'inner' property which is an array.
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
    },
    [affaireDetails, dispatch],
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
    dispatch(fetchClients({}));
    setFilters({
      nameClient: '',
      codeClient: '',
      ICE: '',
    });
  };

  const handleRowClick = (client) => {
    setSelectedClient(client);
    setOpenDialog(false);
    handleAffaireDetailsChange('clientName', client.nameClient);
  };

  console.log('affaireDetails', affaireDetails);

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

                <Dialog
                  open={openDialog}
                  onClose={() => setOpenDialog(false)}
                  fullWidth
                  maxWidth="md"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 100 }}
                >
                  <DialogTitle
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingRight: (theme) => theme.spacing(2),
                    }}
                  >
                    Sélectionner un client
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={() => setOpenDialog(false)}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent sx={{ padding: (theme) => theme.spacing(3) }}>
                    <ClientFilters
                      filters={filters}
                      onFilterChange={(filterKey, value) => {
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          [filterKey]: value,
                        }));
                      }}
                      onFilterSubmit={fetchFilteredClients}
                    />
                    <DataTable
                      count={totalClients}
                      items={clients}
                      columns={[
                        { key: 'nameClient', label: 'Nom' },
                        { key: 'codeClient', label: 'Code' },
                      ]}
                      entity="client"
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleRowsPerPageChange}
                      page={page}
                      isDialog={true}
                      showPagination={false}
                      rowsPerPage={8}
                      onRowClick={handleRowClick}
                    />
                  </DialogContent>
                </Dialog>

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
