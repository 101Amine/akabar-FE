import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  SvgIcon,
  Divider,
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useCallback, useEffect } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setRowsPerPage } from '../../redux/userSlice';
import { DataTable } from '../../sections/DataTable/data-table';
import Head from 'next/head';
import { fetchAffaires } from '../../redux/affaireSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CompaniesSearch } from '../../sections/affaires/companies-search';

const affaireColumns = [
  { key: 'nameClient', label: 'Nom de client' },
  { key: 'nomEtiquette', label: "Nom d'etiquette" },
  { key: 'width', label: 'Width' },
  { key: 'height', label: 'Height' },
  { key: 'quantiteUnitaire', label: 'Quantité Unitaire' },
  { key: 'supportPapier', label: 'Support (PAPIER)' },
  { key: 'typeEtiquette', label: "Type d'etiquette" },
];

const Page = () => {
  const affaires = useSelector((state) => state.affaire.affaires);
  const dispatch = useDispatch();
  const router = useRouter();
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  useEffect(() => {
    dispatch(fetchAffaires());
  }, [dispatch]);

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
    router.push('/ventes/affaires/selectAffaire').then((r) => console.info(r));
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
                  Affaires
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
                  Créer une Affaire
                </Button>
              </div>
            </Stack>
            <CompaniesSearch />
            <DataTable
              count={affaires?.length}
              items={affaires}
              entity="affaire"
              columns={affaireColumns}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
