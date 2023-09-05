import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloudIcon from "@mui/icons-material/Cloud";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "src/components/logo";
import { Scrollbar } from "src/components/scrollbar";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useCallback } from "react";
import { useGlobalContext } from "../../contexts/global-context";
import { API_URL } from "../../utils/misc";

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const globalContext = useGlobalContext();

  const handleAddMemory = useCallback(async () => {
    if (globalContext.isSideNavAddingMemory) return;
    globalContext.setSideNavAddingMemory(true);

    try {
      const token = window.sessionStorage.getItem("token");
      const isAuthenticated = token != null && token != "";
      if (isAuthenticated)
        fetch(API_URL() + "/dev/randommemory", {
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
            globalContext.setSideNavAddingMemory(false);
          });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="inherit" variant="subtitle1">
                Wolfgang
              </Typography>
              <Typography color="neutral.400" variant="body2">
                Admin
              </Typography>
            </div>
            <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
              <ChevronUpDownIcon />
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {items.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Haven&apos;t Add One Today?
          </Typography>
          <Typography color="neutral.500" variant="body2">
            Add a random memory
          </Typography>
          <Button
            component="a"
            endIcon={
              <SvgIcon fontSize="small">
                {globalContext.isSideNavAddingMemory ? <CloudIcon /> : <AddAPhotoIcon />}
              </SvgIcon>
            }
            fullWidth
            sx={{ mt: 2 }}
            target="_blank"
            variant="contained"
            onClick={handleAddMemory}
          >
            {globalContext.isSideNavAddingMemory ? "Processing" : "Add a Memory"}
          </Button>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
