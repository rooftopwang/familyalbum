import PropTypes from "prop-types";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

export const OverviewContributerOfMonth = (props) => {
  const {
    value = {
      name: "",
      contribute: 0,
    },
    sx,
  } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Contributer of Month
            </Typography>
            <Typography variant="h4">{value.name}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <EmojiEventsIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
          <Typography color="text.secondary" variant="caption">
            {value.contribute} Uploads
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewContributerOfMonth.propTypes = {
  value: PropTypes.object,
  sx: PropTypes.object,
};
