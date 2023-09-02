import { useCallback, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";

export const SettingsPassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} wrap="wrap">
            <Grid item xs={12}>
              <Stack spacing={3} sx={{ maxWidth: 400 }}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                />
                <TextField
                  fullWidth
                  label="Password (Confirm)"
                  name="confirm"
                  onChange={handleChange}
                  type="password"
                  value={values.confirm}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} wrap="wrap">
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="contained">Update</Button>
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};
