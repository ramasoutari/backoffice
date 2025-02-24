import { Container, Card, Button, Stack } from "@mui/material";
import { useLocales } from "../../locales";
import { useSettingsContext } from "../../components/settings/context";
import i18n from "../../locales/i18n";
import { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const DahboardView = () => {
  const settings = useSettingsContext();
  const { t } = useLocales();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  const [layout, setLayout] = useState("vertical");
  const [radius, setRadius] = useState(10);
  const [applicationCounts, setApplicationCounts] = useState({
    all: 150,
    approved: 45,
    new: 30,
    rejected: 20,
    returned: 25,
  });

  const buttons = [
    { title: "جميع الطلبات", count: applicationCounts.all, color: "#C06F34" },
    { title: "الطلبات الجديدة", count: applicationCounts.new, color: "green" },
    {
      title: "الطلبات الموافق عليها",
      count: applicationCounts.approved,
      color: "#FF4242",
    },
    {
      title: "الطلبات المرفوضة",
      count: applicationCounts.rejected,
      color: "#E5A023",
    },
    {
      title: "الطلبات المعادة",
      count: applicationCounts.returned,
      color: "#1D3E6E",
    },
  ];

  const chartData = buttons.map((button) => ({
    title: button.title,
    value: button.count,
    color: button.color, // Add color to chart data
  }));

  const commonChartSettings = {
    dataset: chartData,
    height: 400,
    series: [
      {
        data: chartData.map((item) => item.value),
        color: chartData.map((item) => item.color),
      },
    ],
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };

  const chartSettingsV = {
    ...commonChartSettings,
    xAxis: [
      {
        scaleType: "band",
        data: chartData.map((item) => item.title),
        tickLabelStyle: {
          angle: 315,
          textAnchor: "end",
          fontSize: 12,
        },
      },
    ],
  };

  const chartSettingsH = {
    ...commonChartSettings,
    yAxis: [
      {
        scaleType: "band",
        data: chartData.map((item) => item.title),
      },
    ],
  };

  return (
    <Container
      sx={{ direction }}
      maxWidth={settings.themeStretch ? false : "xl"}
    >
      <Card sx={{ padding: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mb: 3 }}
        >
          {buttons.map((button, index) => (
            <Button
              key={index}
              sx={{
                width: "196.83px",
                height: "41.48px",
                bgcolor: button.color,
                borderRadius: "8px",
                color: "white",
                fontSize: "14px",
                "&:hover": {
                  bgcolor: button.color,
                  opacity: 0.9,
                },
              }}
            >
              {button.title} ({button.count})
            </Button>
          ))}
        </Stack>

        <BarChart
          {...(layout === "vertical" ? chartSettingsV : chartSettingsH)}
          borderRadius={radius}
          sx={{
            ".MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
              textAnchor: "end",
              transform: "rotate(-45deg)",
              transformOrigin: "top left",
            },
          }}
        />
      </Card>
    </Container>
  );
};

export default DahboardView;
