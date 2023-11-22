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
import { fetchArticles } from '../../../redux/articleSlice';
import { setRowsPerPage } from '../../../redux/userSlice';
import { useClientFilters } from '../../../hooks/useClientFilters';
import { DataTable } from '../../../sections/DataTable/data-table';
import BackButton from '../../../components/BackButton';
import { fetchAgents } from '../../../redux/agentSlice';

const agentsColumns = [
  { key: 'code', label: 'Code' },
  { key: 'nomAgent', label: 'Nom' },
];

const Page = () => {
  const page = useSelector((state) => state.agent.page);
  const rowsPerPage = useSelector((state) => state.agent.rowsPerPage);
  const totalAgents = useSelector((state) => state.agent.totalAgents);
  const agents = useSelector((state) => state.agent.agents);

  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAgents({}));
  }, [dispatch]);

  const handlePageChange = useCallback(
    (event) => {
      dispatch(setPage(event));
      dispatch(fetchAgents({}));
    },
    [dispatch],
  );

  const handleRowsPerPageChange = useCallback(
    (value) => {
      dispatch(setRowsPerPage(value));
      dispatch(fetchAgents({}));
    },
    [dispatch],
  );

  const proceedToForm = () => {
    router.push('/ventes/agents/createAgent').then((r) => console.info(r));
  };

  return (
    <>
      <Head>
        <title>Agents | Akabar</title>
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
                  Agents
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
                  Nouveau agent
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
              count={totalAgents}
              items={agents}
              columns={agentsColumns}
              entity="agent"
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
