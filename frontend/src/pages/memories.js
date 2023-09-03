import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { MemoryCard } from "src/sections/memories/memory-card";
import { MemoriesSearch } from "src/sections/memories/memories-search";
import { useCallback, useEffect, useState } from "react";

const Page = () => {
  const [memories, setMemories] = useState([]);
  const [inAdding, setInAdding] = useState(false);

  const fetchMemories = useCallback(async () => {
    const response = await fetch("http://localhost:8000/memory");
    const data = await response.json();
    setMemories(data);
  }, []);

  const handleAddMemory = () => {
    try {
      setInAdding(true);
      const token = window.sessionStorage.getItem("token");
      const isAuthenticated = token != null && token != "";
      if (isAuthenticated)
        fetch("http://localhost:8000/dev/randommemory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, randomuser: true }),
        })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setInAdding(false);
          });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!inAdding) fetchMemories();
  }, [inAdding]);

  return (
    <>
      <Head>
        <title>Memories | FamilyAlbum</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Memories</Typography>
                <Typography color="neutral.500" variant="body2">
                  To add new memory, click the add button. You can also let server generate one by
                  clicking the button "add a memory"
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleAddMemory}
                  disabled={inAdding}
                >
                  {inAdding ? "Processing" : "Add"}
                </Button>
              </div>
            </Stack>
            <MemoriesSearch />
            <Grid container spacing={3}>
              {memories &&
                memories.map((memory) => (
                  <Grid xs={12} md={6} lg={4} key={memory.id}>
                    <MemoryCard memory={memory} />
                  </Grid>
                ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
