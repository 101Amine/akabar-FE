import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { ComingSoon } from 'src/components/coming-soon';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Akabar
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        height: 500,
        width: 500,
      }}
    >
      <ComingSoon/>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout isComingSoon={true}>
    {page}
  </DashboardLayout>
);

export default Page;