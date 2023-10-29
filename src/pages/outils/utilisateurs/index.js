import { useCallback, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import { UsersSearch } from 'src/sections/users/users-search';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setPage } from '../../../redux/userSlice';
import { DataTable } from '../../../sections/DataTable/data-table';

const userColumns = [
  { key: 'name', label: 'Nom' },
  { key: 'email', label: 'Email' },
  { key: 'mobilePhoneNumber', label: 'Telephone' },
  { key: 'active', label: 'Status' },
];

const Page = () => {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.user.page);
  const rowsPerPage = useSelector((state) => state.user.rowsPerPage);
  const users = useSelector((state) => state.user.users);
  const router = useRouter();
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  useEffect(() => {
    dispatch(fetchUsers());
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

  const handleBack = () => {
    router.back();
  };

  const proceedToForm = () => {
    router.push('/outils/utilisateurs/createUser').then((r) => console.log(r));
  };

  return (
    <>
      <Head>
        <title>Utilisateurs | Akabar</title>
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
            <Stack spacing={3}>
              <Button
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
                variant="outlined"
                sx={{ position: 'absolute' }}
              >
                Retour
              </Button>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4" marginTop={'70px'}>
                  Liste des utilisateurs
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
            <UsersSearch />
            <DataTable
              count={users?.length}
              items={users}
              columns={userColumns}
              entity="user"
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;