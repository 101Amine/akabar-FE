import { useCallback, useEffect, useState } from 'react';
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
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setPage, setRowsPerPage } from '../../../redux/userSlice';
import { DataTable } from '../../../sections/DataTable/data-table';
import { fetchClients } from '../../../redux/clientSlice';
import { UsersFilters } from '../../../sections/users/users-search';

const userColumns = [
  { key: 'name', label: 'Nom' },
  { key: 'email', label: 'Email' },
  { key: 'mobilePhoneNumber', label: 'Telephone' },
  { key: 'active', label: 'Status' },
];

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const page = useSelector((state) => state.user.page);
  const rowsPerPage = useSelector((state) => state.user.rowsPerPage);
  const users = useSelector((state) => state.user.users);
  const totalUsers = useSelector((state) => state.user.totalUsers);
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    active: '',
  });
  const [hasInteractedWithStatus, setHasInteractedWithStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handlePageChange = useCallback(
    (event) => {
      dispatch(setPage(event));
      dispatch(fetchUsers({}));
    },
    [dispatch],
  );

  const handleRowsPerPageChange = useCallback(
    (value) => {
      dispatch(setRowsPerPage(value));
      dispatch(fetchUsers({}));
    },
    [dispatch],
  );

  const fetchFilteredUsers = useCallback(() => {
    const searchCriteriaList = Object.entries(filters)
      .map(([key, value]) => {
        if (key !== 'active' || (hasInteractedWithStatus && value !== 'ALL')) {
          return {
            filterKey: key,
            operation: key === 'active' ? 'eq' : 'cn',
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

    dispatch(fetchUsers(searchFilter));
  }, [dispatch, filters]);

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
            <UsersFilters
              setHasInteractedWithStatus={setHasInteractedWithStatus}
              filters={filters}
              onFilterChange={(filterKey, value) => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  [filterKey]: value,
                }));
              }}
              onFilterSubmit={() => {
                fetchFilteredUsers();
              }}
            />{' '}
            <DataTable
              count={totalUsers}
              items={users}
              columns={userColumns}
              entity="user"
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
