import Head from 'next/head';
import { Box } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ComingSoon } from 'src/components/coming-soon';

const Page = () => (
  <>
    <Head>
      <title>Akabar</title>
    </Head>
    <Box
      component="main"
      sx={{
        height: 500,
        width: 500,
      }}
    >
      <ComingSoon />
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout isComingSoon={true}>{page}</DashboardLayout>
);

export default Page;
