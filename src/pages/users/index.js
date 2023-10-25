import { useCallback, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UsersSearch } from 'src/sections/users/users-search';
import { useRouter } from 'next/router';
import { DataTable } from '../../sections/DataTable/data-table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setPage, setRowsPerPage } from '../../redux/userSlice';


const userColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'active', label: 'Status' }
];

  const Page = () => {

    const dispatch = useDispatch();

    const page = useSelector(state => state.user.page);
    const rowsPerPage = useSelector(state => state.user.rowsPerPage);
    const users = useSelector(state => state.user.users);
    const router = useRouter();

    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);

    const handlePageChange = useCallback(
      (event, value) => {
        dispatch(setPage(value));
      },
      [dispatch]
    );

    console.log("users",users)

    const handleRowsPerPageChange = useCallback(
      (event) => {
        dispatch(setRowsPerPage(event.target.value));
      },
      [dispatch]
    );

  const proceedToForm = () => {
    router.push('/users/createUser').then(r => console.log(r) );
  };

  return (
    <>
      <Head>
        <title>
          Users | Akabar
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
                  Users
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

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
