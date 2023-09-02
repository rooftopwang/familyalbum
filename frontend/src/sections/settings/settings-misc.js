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

export const SettingsMisc = () => {
  const handleDeleteAll = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/deleteall", {
      method: "POST",
    }).catch((err) => {
      console.log(err);
    });
  };
  return (
    <Card>
      <CardHeader subheader="Manage Content and Other Settings" title="Misc Settings" />
      <Divider />
      <CardContent>
        <Grid container spacing={3} wrap="wrap">
          <Grid item xs={12} md={10}>
            <Typography variant="subtitle2">Erase All Content</Typography>
            <Typography color="neutral.500" variant="body2">
              You can delete all content for testing purposes. Only do it in develop environment.
            </Typography>
          </Grid>
          <Grid item xs={12} md={2} justifyContent="flex-end" alignItems="flex-end">
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" onClick={handleDeleteAll}>
                Delete
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
