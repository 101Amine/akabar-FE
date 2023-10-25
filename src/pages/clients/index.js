import { useCallback, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { ClientsSearch } from 'src/sections/clients/client-search';
import { DataTable } from '../../sections/DataTable/data-table';
import { fetchClients, setPage, setRowsPerPage } from '../../redux/clientSlice';
import { useDispatch, useSelector } from 'react-redux';


const clientColumns = [
  { key: 'companyName', label: 'Company Name' },
  { key: 'contactPerson', label: 'Contact Person' },
  { key: 'contactEmail', label: 'Contact Email' },
  { key: 'active', label: 'Status' },
  { key: 'type', label: 'Type' }
];


const Page = () => {

  // const page = useSelector(state => state.client.page);
  // const rowsPerPage = useSelector(state => state.client.rowsPerPage);
  const clients = useSelector(state => state);
  // const totalCustomers = useSelector(state => state.client.totalClients);

  console.log("clients",clients)
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("fetch clients")
    dispatch(fetchClients());
  }, [dispatch]);

  const handlePageChange = useCallback(
    (event, value) => {
      dispatch(setPage(value));
    },
    [dispatch]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      dispatch(setRowsPerPage(event.target.value));
    },
    [dispatch]
  );

  const proceedToForm = () => {
    router.push('/clients/createClient').then(r => console.info(r));
  };

  return (
    <>
      <Head>
        <title>
          Clients | Akabar
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                Clients
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>

              <Divider />

              <div>
                <Button
                  onClick={proceedToForm}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <ClientsSearch />
            {/*<DataTable*/}
            {/*  count={clients?.length}*/}
            {/*  items={clients}*/}
            {/*  entity="client"*/}
            {/*  columns={clientColumns}*/}
            {/*/>*/}

          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
