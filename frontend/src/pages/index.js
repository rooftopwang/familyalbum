import Head from "next/head";
import { useEffect, useState } from "react";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewAnnualCount } from "src/sections/overview/overview-annual-count";
import { OverviewLatestActions } from "src/sections/overview/overview-latest-actions";
import { OverviewLatestFeeds } from "src/sections/overview/overview-latest-feeds";
import { OverviewActivities } from "src/sections/overview/overview-activities";
import { OverviewMonthlyGoalReached } from "src/sections/overview/overview-monthly-goal-reached";
import { OverviewMonthlyCount } from "src/sections/overview/overview-monthly-count";
import { OverviewContributerOfMonth } from "src/sections/overview/overview-contributer-of-month";
import { OverviewMemoryTypes } from "src/sections/overview/overview-memory-types";
import { useGlobalContext } from "../contexts/global-context";
import { API_URL } from "../utils/misc";

const now = new Date();

const Page = () => {
  const [state, setState] = useState({});
  const globalContext = useGlobalContext();

  useEffect(() => {
    fetch(API_URL() + "/statistics")
      .then((response) => response.json())
      .then((data) => {
        setState(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [globalContext.isSideNavAddingMemory]);

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
              <OverviewAnnualCount sx={{ height: "100%" }} value={state.annualUpload} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewMonthlyCount sx={{ height: "100%" }} value={state.monthlyUpload} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewMonthlyGoalReached sx={{ height: "100%" }} value={state.monthlyGoal} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewContributerOfMonth
                sx={{ height: "100%" }}
                value={state.contributerOfMonth}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestFeeds feeds={state.feeds} sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestActions feeds={state.feeds} sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewActivities chartSeries={state.chartData} sx={{ height: "100%" }} />
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
