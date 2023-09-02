import { useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

export const SettingsNotifications = () => {
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Manage the notifications" title="Notifications" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} wrap="wrap">
            <Grid item xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <Typography variant="h6">Notifications</Typography>
                <Stack>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Email" />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Push Notifications"
                  />
                  <FormControlLabel control={<Checkbox />} label="Text Messages" />
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Phone calls" />
                </Stack>
              </Stack>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Stack spacing={1}>
                <Typography variant="h6">Messages</Typography>
                <Stack>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Email" />
                  <FormControlLabel control={<Checkbox />} label="Push Notifications" />
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Phone calls" />
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="contained">Save</Button>
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};
