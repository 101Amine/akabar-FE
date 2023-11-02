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
import {
  fetchClients,
  setOffset,
  setPage,
  setRowsPerPage,
} from '../../redux/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useClientFilters } from '../../hooks/useClientFilters';
import BackButton from '../../components/BackButton';

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
  const page = useSelector((state) => state.client.page);
  const rowsPerPage = useSelector((state) => state.client.rowsPerPage);
  const totalClients = useSelector((state) => state.client.totalClients);
  const clients = useSelector((state) => state.client.clients);

  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const { filters, setFilters, fetchFilteredClients } = useClientFilters();

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClients({}));
  }, [dispatch]);

  const handlePageChange = useCallback(
    (event) => {
      dispatch(setPage(event));
      dispatch(fetchClients({}));
    },
    [dispatch],
  );

  const handleBack = () => {
    router.back();
  };

  const handleRowsPerPageChange = useCallback(
    (value) => {
      dispatch(setRowsPerPage(value));
      dispatch(fetchClients({}));
    },
    [dispatch],
  );

  const proceedToForm = () => {
    router.push('/ventes/clients/createClient').then((r) => console.info(r));
  };

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
            <BackButton />
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
                  Nouveau client
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
              count={totalClients}
              items={clients}
              columns={clientColumns}
              entity="client"
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
