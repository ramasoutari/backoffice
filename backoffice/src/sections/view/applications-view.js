import { Container, Card, Button, Stack, Box } from "@mui/material";
import { useLocales } from "../../locales";
import { useSettingsContext } from "../../components/settings/context";
import i18n from "../../locales/i18n";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Label from "../../components/label";
import moment from "moment";
import Table from "../../components/table copy/table";
import { GlobalDialog, useGlobalDialogContext } from "../../components/global-dialog";
import ApplicationDetails from "./dialogs/application-details";

const ApplicationsView = () => {
  const settings = useSettingsContext();
  const { t } = useLocales();
  const direction = i18n.language === "ar" ? "ltr" : "rtl";
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const globalDialog = useGlobalDialogContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({ items: [] });
  console.log("Data items:", data.items);
  console.log("Rows:", Array.isArray(data.items) ? data.items : "Not an array");
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
  const dummyOrders = [
    {
      id: "1",
      applicationNumber: "APP001",
      applicantType: "004", // Want Additional Info
      applicantName: "John Doe",
      entityRegistrationDate: "2025-01-10",
      phoneNumber: "1234567890",
      email: "john.doe@example.com",
      NationalRegistrationNumber: "123456789",
      birthDate: null,
      Gender: null,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-10",
      fieldInspection: "additional info",
      exteriorReply: "None",
      extraInfo: "Additional information needed",
      isDeleted: false,
      deletedAt: null,
    },
    {
      id: "2",
      applicationNumber: "APP002",
      applicantType: "016", // Approved
      applicantName: "Jane Smith",
      entityRegistrationDate: "2025-01-12",
      phoneNumber: "9876543210",
      email: "jane.smith@example.com",
      NationalRegistrationNumber: "987654321",
      birthDate: null,
      Gender: null,
      createdAt: "2025-01-05",
      updatedAt: "2025-01-15",
      fieldInspection: "Approved",
      exteriorReply: "None",
      extraInfo: "Approved for processing",
      isDeleted: false,
      deletedAt: null,
    },
    {
      id: "3",
      applicationNumber: "APP003",
      applicantType: "009", // In Process
      applicantName: "Alice Johnson",
      entityRegistrationDate: "2025-01-18",
      phoneNumber: "4561237890",
      email: "alice.johnson@example.com",
      NationalRegistrationNumber: "456123789",
      birthDate: null,
      Gender: null,
      createdAt: "2025-01-08",
      updatedAt: "2025-01-18",
      fieldInspection: "In process",
      exteriorReply: "Pending",
      extraInfo: "Currently being processed",
      isDeleted: false,
      deletedAt: null,
    },
    {
      id: "4",
      applicationNumber: "APP004",
      applicantType: "011", // Rejected
      applicantName: "Emily White",
      entityRegistrationDate: "2025-01-20",
      phoneNumber: "6543219870",
      email: "emily.white@example.com",
      NationalRegistrationNumber: "654321987",
      birthDate: null,
      Gender: null,
      createdAt: "2025-01-10",
      updatedAt: "2025-01-22",
      fieldInspection: "Rejected",
      exteriorReply: "Denied",
      extraInfo: "Rejected due to missing documents",
      isDeleted: false,
      deletedAt: null,
    },
  ];

  const columns = [
    {
      id: "applicationNumber",
      label: t("order_number"),
      renderRow: (row, column) => (
        <>
          {(!row.isMigrated && !(row?.applicationType?.length > 0)) ||
          [].includes(row?.applicationType) ? (
            <Label variant="ghost" sx={{}}>
              {row[column.id]}
            </Label>
          ) : (
            row[column.id]
          )}
        </>
      ),
    },
    {
      id: "createdAt",
      label: t("submission_date"),
      renderRow: (row) => (
        <Label variant="ghost" sx={{}}>
          {moment(row["createdAt"]).locale("en").format("YYYY/MM/DD")}
        </Label>
      ),
    },
    {
      id: "applicantName",
      label: t("applicantName"),
      renderRow: (row, column) => (
        <Label variant="ghost" sx={{}}>
          {row[column.id]}
        </Label>
      ),
    },
    {
      id: "fieldInspection",
      label: t("order_status"),
      renderRow: (row, column) => (
        <Label variant="ghost" sx={{}}>
          {row[column.id]}
        </Label>
      ),
    },
    {
      type: "actions",
      label: t("action"),
      align: "center",
      minWidth: 80,
    },
  ];

  const onChangeRowsPerPage = (rows) => {
    setCurrentPage(1);
    setRowsPerPage(rows);
    // handleSearch(filters, 1, rows)
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    // handleSearch(filters, page)
  };
  useEffect(() => {
    if (dummyOrders) {
      setData({ items: dummyOrders });
    } else {
      setData({ items: [] });
    }

    setLoading(false);
  }, []);
    
     const onDetailsClick = (application) => {
       globalDialog.onOpen({
         title: t("application_details"),
         content: <ApplicationDetails ApplicaitonNumber={application.ApplicaitonNumber} />,
         dismissable: true,
         dialogProps: {
           dismissable: true,
           maxWidth: "lg",
         },
       });
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
        <Box sx={{ overflow: "auto" }}>
          <Box
            sx={{
              width: "100%",
              display: "table",
              tableLayout: "fixed",
              p: 5,
              direction,
            }}
          >
            <Box
              sx={{
                width: "100%", // or use a suitable value if you want to avoid decimal
                height: "716px",
                borderRadius: "1px",
                border: "1px solid black",
                position: "center",
              }}
            >
              <Table
                columns={Array.isArray(columns) ? columns : []} // Ensure columns is an array
                loading={loading}
                rows={Array.isArray(data.items) ? data.items : []}
                pagination={
                  Array.isArray(data?.items) && data.items.length > 0
                    ? {
                        onChangePage: (page) => {
                          onPageChange(page + 1);
                        },
                        onChangeRowsPerPage: (e) => {
                          onChangeRowsPerPage(e.target.value);
                        },
                        rowsPerPage,
                        page: currentPage - 1,
                        total: data?.totalRecords || 0,
                      }
                    : false
                }
                renderActions={(row) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#B0B0B0",
                          borderRadius: "4px",
                          padding: "8px 16px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          borderColor: "#000000",
                        }}
                        onClick={() => onDetailsClick(row)} // You can define the handleView function to handle the click
                      >
                        مشــاهدة
                      </Button>
                    </Box>
                  );
                }}
              />
            </Box>
          </Box>
          {/* <Button>hhi</Button> */}
        </Box>
      </Card>
    </Container>
  );
};

export default ApplicationsView;
