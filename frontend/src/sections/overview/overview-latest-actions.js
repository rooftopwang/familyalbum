import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { useRouter } from "next/navigation";

const statusMap = {
  pets: "primary",
  dishes: "success",
  cities: "warning",
};

export const OverviewLatestActions = (props) => {
  const { feeds = [], sx } = props;
  const router = useRouter();

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Actions" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>Title</TableCell>
                <TableCell sortDirection="desc">Date</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeds.map((feed) => {
                const createdAt = format(feed.createdAt, "dd/MM/yyyy");

                return (
                  <TableRow hover key={feed.id}>
                    <TableCell>{feed.author}</TableCell>
                    <TableCell>{feed.title}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[feed.type]}>{feed.type}</SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          onClick={() => {
            router.push("/memories");
          }}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestActions.prototype = {
  feeds: PropTypes.array,
  sx: PropTypes.object,
};
