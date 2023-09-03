import { useCallback, useState } from "react";
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
  const [inDeletingAll, setInDeletingAll] = useState(false);
  const [inFillingRandom, setInFillingRandom] = useState(false);

  const handleDeleteAll = (event) => {
    event.preventDefault();
    setInDeletingAll(true);
    fetch("http://localhost:8000/dev/deleteall", {
      method: "POST",
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInDeletingAll(false);
      });
  };

  const handleFillRandom = (event) => {
    event.preventDefault();
    setInFillingRandom(true);
    fetch("http://localhost:8000/fillrandom", {
      method: "POST",
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInFillingRandom(false);
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
              You can delete all content for testing purposes. Do it in develop environment only.
            </Typography>
          </Grid>

          <Grid item xs={12} md={2} justifyContent="flex-end" alignItems="flex-end">
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" disabled={inDeletingAll} onClick={handleDeleteAll}>
                {inDeletingAll ? "Processing" : "Delete"}
              </Button>
            </CardActions>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography variant="subtitle2">Fill Random Data</Typography>
            <Typography color="neutral.500" variant="body2">
              Fill database with random users and memory feeds for testing.
            </Typography>
          </Grid>
          <Grid item xs={12} md={2} justifyContent="flex-end" alignItems="flex-end">
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" disabled={inFillingRandom} onClick={handleFillRandom}>
                {inFillingRandom ? "Processing" : "Fill"}
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
