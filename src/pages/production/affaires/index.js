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
  useMediaQuery,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setRowsPerPage } from '../../../redux/userSlice';
import { DataTable } from '../../../sections/DataTable/data-table';
import BackButton from '../../../components/utils/BackButton';
import { fetchAffaires } from '../../../redux/affaireSlice';
import { AffairesFilters } from '../../../sections/affaires/affaires-filters';
import { useItemsFilters } from '../../../hooks/useItemsFilters';

const affaireColumns = [
  { key: 'name', label: 'Nom' },
  { key: 'clientName', label: 'Client' },
  { key: 'type', label: 'Type affaire' },
  { key: 'productType', label: 'Type produit' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
];

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const page = useSelector((state) => state.affaire.page);
  const rowsPerPage = useSelector((state) => state.affaire.rowsPerPage);
  const affaires = useSelector((state) => state.affaire.affaires);
  const totalAffaires = useSelector((state) => state.affaire.totalAffaires);
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const [filters, setFilters] = useState({
    'client.nameClient': '',
    name: '',
  });

  const { fetchFilteredItems } = useItemsFilters({
    filters,
    setFilters,
    dispatch,
    fetchAction: fetchAffaires,
  });

  useEffect(() => {
    dispatch(fetchAffaires({}));
  }, [dispatch]);

  const handlePageChange = useCallback(
    (event) => {
      dispatch(setPage(event));
      dispatch(fetchAffaires({}));
    },
    [dispatch],
  );

  const handleRowsPerPageChange = useCallback(
    (value) => {
      dispatch(setRowsPerPage(value));
      dispatch(fetchAffaires({}));
    },
    [dispatch],
  );

  const proceedToForm = () => {
    router
      .push('/production/affaires/selectAffaire')
      .then((r) => console.log(r));
  };

  return (
    <>
      <Head>
        <title>Affaires | Akabar</title>
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
          style={{
            marginLeft: lgUp ? (isIconOnly ? '-100px' : '50px') : '0',
          }}
        >
          <Stack spacing={3}>
            <Stack spacing={3}>
              <BackButton />
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4" marginTop={'70px'}>
                  Liste des affaires
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
                  Nouveau affaire
                </Button>
              </div>
            </Stack>
            <AffairesFilters
              filters={filters}
              onFilterChange={(filterKey, value) => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  [filterKey]: value,
                }));
              }}
              onFilterSubmit={() => {
                fetchFilteredItems();
              }}
            />{' '}
            <DataTable
              count={totalAffaires}
              items={affaires}
              isAffaire={true}
              columns={affaireColumns}
              entity="affaires"
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
