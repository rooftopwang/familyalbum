import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccountProfile } from "src/sections/account/account-profile";
import { AccountProfileDetails } from "src/sections/account/account-profile-details";
import { useEffect, useState, useCallback } from "react";
import { API_URL } from "../utils/misc";
const Page = () => {
  const [profile, setProfile] = useState({});

  const fetchProfile = useCallback(async () => {
    const token = window.sessionStorage.getItem("token");
    const response = await fetch(API_URL() + "/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const profiledata = await response.json();
    const _profile = {
      ...profiledata,
      ...profiledata.address,
    };
    setProfile(_profile);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Head>
        <title>Profile | FamilyAlbum</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Profile</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <AccountProfile profile={profile} />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <AccountProfileDetails profile={profile} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
