import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { ComingSoon } from 'src/components/ComingSoon/coming-soon';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();

  return (
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
};

Page.getLayout = (page) => (
  <DashboardLayout isComingSoon={true}>{page}</DashboardLayout>
);

export default Page;
