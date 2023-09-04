import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";

export const OverviewLatestFeeds = (props) => {
  const { feeds = [], sx } = props;
  const router = useRouter();

  return (
    <Card sx={sx}>
      <CardHeader title="Feeds" />
      <List>
        {feeds.map((feed, index) => {
          if (index >= 5) return;
          const hasDivider = index < feeds.length - 1;

          const ago = formatDistanceToNow(new Date(feed.createdAt));

          return (
            <ListItem divider={hasDivider} key={feed.id}>
              <ListItemAvatar>
                {feed.filename ? (
                  <Box
                    component="img"
                    src={`${feed.filename}`}
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "neutral.200",
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={feed.title}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
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

OverviewLatestFeeds.propTypes = {
  feeds: PropTypes.array,
  sx: PropTypes.object,
};
