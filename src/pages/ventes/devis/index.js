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
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from '../../../sections/DataTable/data-table';
import { setRowsPerPage, setPage } from '../../../redux/userSlice';
import BackButton from '../../../components/BackButton';
import { fetchDevis } from '../../../redux/devisSlice';

const devisColumns = [
  { key: 'numeroDevis', label: 'numero devis' },
  { key: 'date', label: 'date' },
  { key: 'nomClient', label: 'nom' },
  { key: 'agent', label: 'agent' },
  { key: 'netAPayer', label: 'Net A Payer' },
  { key: 'status', label: 'Status' },
];

const Page = () => {
  const page = useSelector((state) => state.devis.page);
  const rowsPerPage = useSelector((state) => state.devis.rowsPerPage);
  const totalDevis = useSelector((state) => state.devis.totalDevis);
  const devis = useSelector((state) => state.devis.devis);

  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDevis({}));
  }, [dispatch]);

  const handlePageChange = useCallback(
    (event) => {
      dispatch(setPage(event));
      dispatch(fetchDevis({}));
    },
    [dispatch],
  );

  const handleRowsPerPageChange = useCallback(
    (value) => {
      dispatch(setRowsPerPage(value));
      dispatch(fetchDevis({}));
    },
    [dispatch],
  );

  const proceedToForm = () => {
    router.push('/ventes/devis/createDevis').then((r) => console.info(r));
  };

  return (
    <>
      <Head>
        <title>Devis | Akabar</title>
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
                  Devis
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
                  Nouveau devis
                </Button>
              </div>
            </Stack>
            {/*<ClientFilters*/}
            {/*  filters={filters}*/}
            {/*  onFilterChange={(filterKey, value) => {*/}
            {/*    setFilters((prevFilters) => ({*/}
            {/*      ...prevFilters,*/}
            {/*      [filterKey]: value,*/}
            {/*    }));*/}
            {/*  }}*/}
            {/*  onFilterSubmit={() => {*/}
            {/*    fetchFilteredClients();*/}
            {/*  }}*/}
            {/*/>*/}
            <DataTable
              count={totalDevis}
              items={devis}
              columns={devisColumns}
              entity="devis"
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
