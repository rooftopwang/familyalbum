import PropTypes from "prop-types";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  TextField,
} from "@mui/material";

const convertTime = (createdAt) => {
  return format(new Date(createdAt), "MMMM do, yyyy");
};
export const MemoryCard = (props) => {
  const { memory } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 300,
              width: 300,
              borderRadius: 1,
            }}
            alt="The house from the offer."
            src={`${memory.filename}`}
          />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {memory.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {memory.desc}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {convertTime(memory.createdAt)}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <AccountCircleIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {memory.author ?? "known author"}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

MemoryCard.propTypes = {
  memory: PropTypes.object.isRequired,
};
