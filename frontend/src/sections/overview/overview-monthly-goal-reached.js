import PropTypes from "prop-types";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const OverviewMonthlyGoalReached = (props) => {
  const {
    value = {
      digit: 0,
      progress: 0,
    },
    sx,
  } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" gutterBottom variant="overline">
              Monthly Goal
            </Typography>
            <Typography variant="h4">{value.digit}%</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress value={value.progress} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewMonthlyGoalReached.propTypes = {
  value: PropTypes.object,
  sx: PropTypes.object,
};
