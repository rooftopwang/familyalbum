import PropTypes from "prop-types";
import PetsIcon from "@mui/icons-material/Pets";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LuggageIcon from "@mui/icons-material/Luggage";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme as createTheme,
} from "@mui/material";
import { Chart } from "src/components/chart";

const useChartOptions = (labels) => {
  const theme = createTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const iconMapOptions = () => {
  const theme = createTheme();
  const iconMaps = {
    Pets: (
      <SvgIcon>
        <PetsIcon sx={{ color: theme.palette.primary.main }} />
      </SvgIcon>
    ),
    Dishes: (
      <SvgIcon>
        <LocalPizzaIcon sx={{ color: theme.palette.success.main }} />
      </SvgIcon>
    ),
    Trips: (
      <SvgIcon>
        <LuggageIcon sx={{ color: theme.palette.warning.main }} />
      </SvgIcon>
    ),
  };
  return iconMaps;
};

export const OverviewMemoryTypes = (props) => {
  const { chartSeries = [0, 0, 0], labels, sx } = props;
  const chartOptions = useChartOptions(labels);
  const iconMaps = iconMapOptions();

  return (
    <Card sx={sx}>
      <CardHeader title="Memory Types" />
      <CardContent>
        <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {chartSeries.map((item, index) => {
            const label = labels[index];

            return (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {iconMaps[label]}
                <Typography sx={{ my: 1 }} variant="h6">
                  {label}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {item}%
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewMemoryTypes.propTypes = {
  chartSeries: PropTypes.array,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
