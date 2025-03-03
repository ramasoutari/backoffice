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
    { title: "جميع الطلبات", color: "#D4AF37", count: 2 },
    {
      title: "الطلبات الجديدة",
      color: "#000000",
      status: "SUBMITTED",
      count: 4,
    },
    {
      title: "الطلبات قيد العمل",
      color: "#2E8B57",
      status: "IN_PROGRESS",
      count: 8,
    },
    {
      title: "الطلبات اللتي بحاجة لمعلومات الاضافية",
      color: "#C2B280",
      status: "EXTRA_INFO",
      count: 6,
    },
    {
      title: "الطلبات الكشف الميداني",
      color: "#005691",
      status: "INSPECTION",
      count: 9,
    },
    {
      title: "الطلبات المرفوضة",
      color: "#CC5500",
      status: "DECLINED",
      count: 10,
    },
    {
      title: "الطلبات الموافق عليها",
      color: "#4F4F4F",
      status: "ACCEPTED",
      count: 5,
    },
  ];

  const chartData = buttons.map((button) => ({
    title: button.title,
    value: button.count,
    color: button.color,
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
          spacing={1}
          justifyContent="center"
          sx={{ mb: 3 }}
        >
          {buttons.map((button, index) => (
            <Button
              key={index}
              sx={{
                width: "165.83px",
                height: "41.48px",
                bgcolor: button.color,
                borderRadius: "8px",
                textAlign: "center",
                color: "white",
                fontSize: "14px",
                "&:hover": {
                  bgcolor: button.color,
                  opacity: 0.9,
                },
              }}
            >
              {button.title}
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
