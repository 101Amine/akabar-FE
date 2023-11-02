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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ClientFilters } from '../../../sections/clients/client-search';
import { DataTable } from '../../../sections/DataTable/data-table';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {
  fetchClients,
  setPage,
  setRowsPerPage,
} from '../../../redux/clientSlice';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { useClientFilters } from '../../../hooks/useClientFilters';
import BackButton from '../../../components/BackButton';
import { setAffaireDetails } from '../../../redux/affaireSlice';

const Page = () => {
  const dispatch = useDispatch();

  const [affaireType, setAffaireType] = useState('');
  const [affaireName, setAffaireName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const page = useSelector((state) => state.client.page);
  const totalClients = useSelector((state) => state.client.totalClients);
  const clients = useSelector((state) => state.client.clients);
  const [selectDate, setSelectedDate] = useState(new Date());
  const { affaireDetails, submitting, error, success } = useSelector(
    (state) => state.affaire,
  );

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

  const router = useRouter();
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const handleAffaireChange = (event) => {
    setAffaireType(event.target.value);
    handleAffaireDetailsChange('productType', event.target.value);
  };

  const proceedToForm = () => {
    router.push('/production/affaires/createAffaire');
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    dispatch(fetchClients({}));
    setFilters({
      nameClient: '',
      codeClient: '',
      ICE: '',
    });
  };

  const handleBack = () => {
    router.back();
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
                  {selectedClient ? (
                    <EditIcon sx={{ marginRight: '8px' }} />
                  ) : null}
                  {selectedClient
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
                      onRowClick={(client) => {
                        setSelectedClient(client);
                        setOpenDialog(false);
                        handleAffaireDetailsChange(
                          'clientName',
                          client.nameClient,
                        );
                      }}
                    />
                  </DialogContent>
                </Dialog>

                {affaireDetails.clientName !== '' && (
                  <TextField
                    fullWidth
                    label="Client sélectionné"
                    value={selectedClient ? selectedClient.nameClient : ''}
                    disabled
                  />
                )}

                <DatePicker
                  defaultValue={dayjs()}
                  label="Select Date"
                  format="DD/MM/YYYY"
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) => {
                    const currentTime = dayjs();
                    const hours = currentTime.hour();
                    const minutes = currentTime.minute();
                    const seconds = currentTime.second();
                    const finalDateTime = newValue
                      .hour(hours)
                      .minute(minutes)
                      .second(seconds);
                    setSelectedDate(finalDateTime);
                    handleAffaireDetailsChange('date', finalDateTime);
                  }}
                />

                <TextField
                  fullWidth
                  label="Nom"
                  value={affaireName}
                  onChange={(e) => {
                    setAffaireName(e.target.value);
                    handleAffaireDetailsChange('nom', e.target.value);
                  }}
                />

                <Select
                  value={affaireType}
                  onChange={handleAffaireChange}
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
                  <MenuItem value={'Etiquette'}>Etiquette</MenuItem>
                  <MenuItem value={'item2'}>Menu item 2</MenuItem>
                  <MenuItem value={'item3'}>Menu item 3</MenuItem>
                  <MenuItem value={'item4'}>Menu item 4</MenuItem>
                  <MenuItem value={'item5'}>Menu item 5</MenuItem>
                </Select>

                <Button
                  onClick={proceedToForm}
                  variant="contained"
                  style={{ maxWidth: '100px' }}
                >
                  Suivant
                </Button>
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
