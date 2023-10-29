import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import {
  ClientFilters,
  ClientsSearch,
} from 'src/sections/clients/client-search';
import { DataTable } from '../../sections/DataTable/data-table';
import { fetchClients, setPage, setRowsPerPage } from '../../redux/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const clientColumns = [
  { key: 'nameClient', label: 'Nom' },
  { key: 'codeClient', label: 'Code' },
  { key: 'phone', label: 'Telephone' },
  { key: 'fax', label: 'fax' },
  { key: 'ice', label: 'Ice' },
  { key: 'address', label: 'Addresse' },
  { key: 'bankAccount', label: 'Compte bancaire' },
];

const Page = () => {
  // const page = useSelector(state => state.client.page);
  // const rowsPerPage = useSelector(state => state.client.rowsPerPage);
  const clients = useSelector((state) => state.client.clients);
  // const totalCustomers = useSelector(state => state.client.totalClients);

  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const [filters, setFilters] = useState({
    nameClient: '',
    codeClient: '',
    ICE: '',
  });

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClients({}));
  }, [dispatch]);

  const fetchFilteredClients = useCallback(() => {
    const searchCriteriaList = Object.entries(filters)
      .map(([key, value]) => {
        if (value) {
          return {
            filterKey: key,
            operation: 'cn',
            value: value,
            dataOption: 'all',
          };
        }
        return null;
      })
      .filter(Boolean);

    const searchFilter = {
      searchCriteriaList: searchCriteriaList,
      dataOption: 'all',
    };

    console.log('searchFilter', searchFilter);

    dispatch(fetchClients(searchFilter));
  }, [dispatch, filters]);

  const handlePageChange = useCallback(
    (event, value) => {
      dispatch(setPage(value));
    },
    [dispatch],
  );

  const handleBack = () => {
    router.back();
  };

  const handleRowsPerPageChange = useCallback(
    (event) => {
      dispatch(setRowsPerPage(event.target.value));
    },
    [dispatch],
  );

  const proceedToForm = () => {
    router.push('/ventes/clients/createClient').then((r) => console.info(r));
  };

  console.log('clients', clients);

  return (
    <>
      <Head>
        <title>Clients | Akabar</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container
          maxWidth={isIconOnly ? 'false' : 'xl'}
          style={{ marginLeft: isIconOnly ? '-100px' : '50px' }}
        >
          <Stack spacing={3}>
            <Button
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              sx={{ position: 'absolute' }}
            >
              Retour
            </Button>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4" marginTop={'70px'}>
                  Clients
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>

              <Divider />

              <div>
                <Button
                  onClick={proceedToForm}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Ajouter
                </Button>
              </div>
            </Stack>
            <ClientFilters
              filters={filters}
              onFilterChange={(filterKey, value) => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  [filterKey]: value,
                }));
              }}
              onFilterSubmit={() => {
                fetchFilteredClients();
              }}
            />
            <DataTable
              count={clients?.length}
              items={clients}
              entity="client"
              columns={clientColumns}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
