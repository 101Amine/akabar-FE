import { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  TextField,
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  setClientDetails,
  addClient,
  clearClientDetails,
} from '../../../redux/clientSlice';
import { useRouter } from 'next/router';
import { createClientValidationSchema } from '../../../utils/validationService';
import BackButton from '../../../components/BackButton';
import { clearDevisDetails, setDevisDetails } from '../../../redux/devisSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import Fade from '@mui/material/Fade';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import { ClientFilters } from '../../../sections/clients/client-search';
import { DataTable } from '../../../sections/DataTable/data-table';
const CreateDevis = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // State
  const { devisDetails, submitting, error, success } = useSelector(
    (state) => state.devis,
  );

  // Local State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [formErrors, setFormErrors] = useState({});
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  // Handlers
  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      let updatedValue = value;

      // If the change is for 'nameClient', convert the value to uppercase
      if (name === 'name') {
        updatedValue = value.toUpperCase();
      }

      dispatch(
        setDevisDetails({
          ...devisDetails,
          [name]: updatedValue,
        }),
      );
    },
    [devisDetails, dispatch],
  );

  useEffect(() => {
    dispatch(clearDevisDetails());
  }, [dispatch]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      createClientValidationSchema
        .validate(devisDetails, { abortEarly: false })
        .then(() => {
          // If validation is successful
          dispatch(addClient(devisDetails));
          router.push('/ventes/devis');
          handleSnackbarOpen('devis ajouté avec succès !', 'success');
        })
        .catch((err) => {
          handleSnackbarOpen(
            "Échec de l'ajout d'un devis. Veuillez réessayer.",
            'error',
          );
          let errors = {};
          err.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          setFormErrors(errors);
        });
    },
    [devisDetails, dispatch, router, success, submitting],
  );

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
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
        <BackButton />
        <Box marginTop={8}>
          <Typography variant="h4" gutterBottom marginTop="80px">
            Créer un devis{' '}
          </Typography>
          <Divider />
          <Box justifyContent="center" mt={4}>
            <Card
              style={{ width: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            >
              <CardContent>
                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Grid
                    container
                    spacing={3}
                    padding={2}
                    display="flex"
                    flexDirection="column"
                  >
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
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        label="Nom du devis"
                        name="nameClient"
                        onChange={handleChange}
                        required
                        value={devisDetails.name}
                        error={Boolean(formErrors.name)}
                        helperText={formErrors.name}
                      />
                    </Grid>
                  </Grid>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" mt={2} mb={2}>
                    <Button variant="contained" color="primary" type="submit">
                      Enregistrer
                    </Button>
                  </Box>
                </form>
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
                severity={snackbarSeverity} // Use the snackbarSeverity state variable
                onClose={() => setSnackbarOpen(false)}
              >
                {snackbarMessage}
              </MuiAlert>
            </Snackbar>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

CreateDevis.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateDevis;
