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

const articleColumns = [
  { key: 'nameClient', label: 'Nom' },
  { key: 'codeClient', label: 'Code' },
  { key: 'phone', label: 'Telephone' },
  { key: 'fax', label: 'fax' },
  { key: 'ice', label: 'Ice' },
  { key: 'address', label: 'Addresse' },
  { key: 'bankAccount', label: 'Compte bancaire' },
];

const Page = () => {
  const page = useSelector((state) => state.article.page);
  const rowsPerPage = useSelector((state) => state.article.rowsPerPage);
  const totalArticles = useSelector((state) => state.article.totalArticles);
  const articles = useSelector((state) => state.article.articles);

  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles({}));
  }, [dispatch]);

  const handlePageChange = useCallback(
    (event) => {
      dispatch(setPage(event));
      dispatch(fetchArticles({}));
    },
    [dispatch],
  );

  const handleRowsPerPageChange = useCallback(
    (value) => {
      dispatch(setRowsPerPage(value));
      dispatch(fetchArticles({}));
    },
    [dispatch],
  );

  const proceedToForm = () => {
    router.push('/stock/articles/createArticle').then((r) => console.info(r));
  };

  return (
    <>
      <Head>
        <title>Articles | Akabar</title>
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
                  Articles
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
                  Nouveau article
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
              count={totalArticles}
              items={articles}
              columns={articleColumns}
              entity="client"
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
