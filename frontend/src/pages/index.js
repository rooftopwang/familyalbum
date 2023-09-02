import Head from "next/head";
import { useEffect, useState } from "react";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestActions } from "src/sections/overview/overview-latest-actions";
import { OverviewLatestFeeds } from "src/sections/overview/overview-latest-feeds";
import { OverviewActivities } from "src/sections/overview/overview-activities";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewMemoryTypes } from "src/sections/overview/overview-memory-types";

const now = new Date();

const Page = () => {
  const [state, setState] = useState({
    feeds: [],
    types: [0, 0, 0],
  });

  useEffect(() => {
    fetch("http://localhost:8000/statistics")
      .then((response) => response.json())
      .then((data) => {
        setState(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Overview | FamilyAlbum</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="$24k" />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value="1.6k"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestFeeds feeds={state.feeds} sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestActions feeds={state.feeds} sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewActivities
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewMemoryTypes
                chartSeries={state.types}
                labels={["Pets", "Dishes", "Trips"]}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
