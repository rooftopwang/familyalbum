import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
// import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { UsersTable } from "src/sections/user/users-table";
import { UsersSearch } from "src/sections/user/users-search";
import { applyPagination } from "src/utils/apply-pagination";
import { API_URL } from "../utils/misc";

const now = new Date();

const useUsers = (page, rowsPerPage, data) => {
  return useMemo(() => {
    data = data || [];
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage, data]);
};

const useUserIds = (users) => {
  return useMemo(() => {
    return users.map((user) => user.id);
  }, [users]);
};

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [inAddingRandom, setInAddingRandom] = useState(false);
  const users = useUsers(page, rowsPerPage, data);
  const usersIds = useUserIds(users);
  const usersSelection = useSelection(usersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const fetchPosts = useCallback(async () => {
    const response = await fetch(API_URL() + "/users");
    const resData = await response.json();
    setData(resData);
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    setInAddingRandom(true);
    fetch(API_URL() + "/dev/randomuser", {
      method: "POST",
    })
      .then((res) => {
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInAddingRandom(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Users | FamilyAlbum</title>
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
                <Typography variant="h4">Registered Users</Typography>
                <Typography color="neutral.500" variant="body2">
                  This is admin exclusive page. Use the page to manage registered users.
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
                  disabled={inAddingRandom}
                  onClick={handleAdd}
                >
                  {inAddingRandom ? "Processing" : "Add"}
                </Button>
              </div>
            </Stack>
            <UsersSearch />
            <UsersTable
              count={data.length}
              items={users}
              onDeselectAll={usersSelection.handleDeselectAll}
              onDeselectOne={usersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={usersSelection.handleSelectAll}
              onSelectOne={usersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={usersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
