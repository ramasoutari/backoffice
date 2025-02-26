import { Container, Card, Button, Stack, Box } from "@mui/material";
import { useLocales } from "../../locales";
import { useSettingsContext } from "../../components/settings/context";
import i18n from "../../locales/i18n";
import { useEffect, useState } from "react";
import Label from "../../components/label";
import moment from "moment";
import Table from "../../components/table copy/table";
import { useGlobalDialogContext } from "../../components/global-dialog";
import ApplicationDetails from "./dialogs/application-details";
import { useGetApplications } from "../../api/appliactions.api";
import { useAuthContext } from "../../auth/hooks";
import EmptyContent from "../../components/empty-content";

const ApplicationsView = () => {
  const settings = useSettingsContext();
  const { t } = useLocales();
  const { user } = useAuthContext();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const [loading, setLoading] = useState(false);
  const globalDialog = useGlobalDialogContext();
  const getApplications = useGetApplications();

  useEffect(() => {
    getApplications.mutate({
      id: user?.departmentId,
    });
  }, [user?.departmentId]);

  const buttons = [
    { title: "الكل", color: "#D4AF37" },
    {
      title: "جديد",
      color: "#000000",
      status: "Submitted",
    },
    {
      title: "قيد العمل",
      color: "#2E8B57",
      status: "InProgress",
    },
    {
      title: "بحاجة لمعلومات الاضافية",
      color: "#C2B280",
      status: "ExtraInfo",
    },
    {
      title: "الكشف الميداني",
      color: "#005691",
      status: "Inspection",
    },
    {
      title: "مرفوض",
      color: "#CC5500",
      status: "Declined",
    },
    {
      title: "الموافق عليها",
      color: "#4F4F4F",
      status: "Accepted",
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
      id: "status",
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

  const onDetailsClick = (application) => {
    console.log("nnmnnnnnnnnnnnnn", application);
    globalDialog.onOpen({
      title: t("application_details"),
      content: <ApplicationDetails ApplicaitonNumber={application.id} />,
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
                width: "140.83px",
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
              onClick={() => {
                getApplications.mutateAsync({
                  id: user?.departmentId,
                  status: button.status,
                });
              }}
            >
              {button.title}
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
                width: "100%",
                height: "716px",
                borderRadius: "8px",
                border: "1px solid black",
                overflow: "hidden",
                position: "center",
              }}
            >
              <Table
                columns={columns}
                loading={loading}
                rows={getApplications.data || []}
                emptyText={<EmptyContent hideImg title={t("no_data")} />}
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
                        onClick={() => {
                          console.log("rowww", row);
                          onDetailsClick(row);
                        }}
                      >
                        مشــاهدة
                      </Button>
                    </Box>
                  );
                }}
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default ApplicationsView;
