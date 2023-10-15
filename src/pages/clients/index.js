import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/users/customers-table';
import { CustomersSearch } from 'src/sections/users/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { ClientTable } from 'src/sections/clients/client-table';
import { useRouter } from 'next/router';
import { ClientsSearch } from 'src/sections/clients/client-search';


const data = [
  {
    id: '5e887ac47eed253091be10cb',
    firstName: 'Becha',
    lastName: 'Mohamed Amine',
    email: 'aminebecha8@gmail.com',
    mobilePhoneNumber: '0699494516',
    phone: '0512345678',
    fax: '0512345679',
    ice: 'ICE001',
    bankAccount: 'BANK0012345',
    address: '123 Street, City, Country'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    firstName: 'Ayoub',
    lastName: 'Alouani',
    email: 'Ayoubalouani@gmail.com',
    mobilePhoneNumber: '0699541265',
    phone: '0523456789',
    fax: '0523456790',
    ice: 'ICE002',
    bankAccount: 'BANK0012346',
    address: '456 Lane, City, Country'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    firstName: 'XXXXX',
    lastName: 'YYYYY',
    email: 'test@test.com',
    mobilePhoneNumber: '0600225545',
    phone: '0534567890',
    fax: '0534567891',
    ice: 'ICE003',
    bankAccount: 'BANK0012347',
    address: '789 Avenue, City, Country'
  },
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const router = useRouter();

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const proceedToForm = () => {
    router.push('/clients/createClient');
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
            <ClientTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
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
