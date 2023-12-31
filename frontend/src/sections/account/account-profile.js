import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export const AccountProfile = ({ profile }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={profile.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80,
          }}
        />
        <Typography gutterBottom variant="h5">
          {profile.name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {profile.city} {profile.country}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {profile.isAdmin ? "Admin" : "User"}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions>
  </Card>
);
