import { useCallback, useEffect } from 'react';
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
import { ClientsSearch } from 'src/sections/clients/client-search';
import { DataTable } from '../../sections/DataTable/data-table';
import { fetchClients, setPage, setRowsPerPage } from '../../redux/clientSlice';
import { useDispatch, useSelector } from 'react-redux';

const clientColumns = [
  { key: 'nameClient', label: 'Nom du client' },
  { key: 'email', label: 'Email' },
  { key: 'mobilePhoneNumber', label: 'telephone' },
  { key: 'phone', label: 'fix' },
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

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handlePageChange = useCallback(
    (event, value) => {
      dispatch(setPage(value));
    },
    [dispatch],
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      dispatch(setRowsPerPage(event.target.value));
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
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Clients</Typography>
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
                  Ajouté
                </Button>
              </div>
            </Stack>
            <ClientsSearch />
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
