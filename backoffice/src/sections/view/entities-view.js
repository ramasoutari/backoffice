import { Container, Card, Button, Box, Typography } from "@mui/material";
import { useLocales } from "../../locales";
import { useSettingsContext } from "../../components/settings/context";
import i18n from "../../locales/i18n";
import { useMemo } from "react";
import Table from "../../components/table copy/table";
import { useGlobalDialogContext } from "../../components/global-dialog";
import AddUserDialog from "./dialogs/add-user-dialog";
import { useGlobalPromptContext } from "../../components/global-prompt";
import {
  useDeleteEntity,
  useEntityApprove,
  useEntityReject,
  useGetEntities,
} from "../../api/entities.api";
import Label from "../../components/label";
import ViewEntityDialog from "./dialogs/view-entity-dialog";
import EmptyContent from "../../components/empty-content";

const EntitiesView = () => {
  const settings = useSettingsContext();
  const { t } = useLocales();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const globalDialog = useGlobalDialogContext();
  const globalPrompt = useGlobalPromptContext();
  const getEntities = useGetEntities();
  const approveEntity = useEntityApprove();
  const RejectEntity = useEntityReject();
  const deleteEntity = useDeleteEntity();

  const EntitiesArr = useMemo(() => {
    return getEntities.data;
  }, [getEntities.data]);
  const columns = [
    {
      id: "name",
      label: t("entity_name"),
      renderRow: (row, column) => (
        <>
          {(!row.isMigrated && !(row?.applicationType?.length > 0)) ||
          [].includes(row?.applicationType) ? (
            <Label variant="ghost">{row[column.id]}</Label>
          ) : (
            row[column.id]
          )}
        </>
      ),
    },
    {
      id: "entityNumber",
      label: t("entityNumber"),
      renderRow: (row, column) => (
        <Label variant="ghost">{row[column.id]}</Label>
      ),
    },
    {
      id: "officerName",
      label: t("officerName"),
      renderRow: (row, column) => (
        <Label variant="ghost">{row[column.id]}</Label>
      ),
    },
    {
      id: "type",
      label: t("type"),
      maxWidth: 100,

      renderRow: (row, column) => {
        const typeMapping = {
          "002": "شركات",
          "001": "مؤسسة فردية",
        };

        return (
          <Label variant="ghost">
            {typeMapping[row[column.id]] || row[column.id]}
          </Label>
        );
      },
    },
    {
      id: "status",
      label: t("status"),
      maxWidth: 100,

      renderRow: (row, column) => {
        const typeMapping = {
          "001": "مسجلة",
          "002": "مرفوضة ",
          "003": "بانتظار الموافقة",
        };

        return (
          <Label variant="ghost">
            {typeMapping[row[column.id]] || row[column.id]}
          </Label>
        );
      },
    },
    {
      type: "actions",
      label: t("action"),
      align: "center",
      minWidth: 80,
    },
  ];

  const onDetailsClick = (entity) => {
    globalDialog.onOpen({
      title: t("entity_info"),
      content: <ViewEntityDialog entity={entity} viewOnly={true} />,
      dialogProps: {
        dismissable: true,
        maxWidth: "lg",
      },
    });
  };

  return (
    <Container
      sx={{ direction, p: 2 }}
      maxWidth={settings.themeStretch ? false : "xl"}
    >
      <Card sx={{ padding: 2 }}>
        <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
          طلبات المنشأت
        </Typography>

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
                borderRadius: "8px",
                border: "1px solid black",
                overflow: "hidden",

                position: "center",
              }}
            >
              <Table
                columns={columns}
                loading={getEntities.isFetching}
                rows={EntitiesArr || []}
                emptyText={<EmptyContent hideImg title={t("no_data")} />}
                renderActions={(row) => {
                  console.log("Action row data:", row);

                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      {row.status === "003" && (
                        <>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#2E7D32",
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "none",
                              borderRadius: "8px",
                              padding: "6px 16px",
                              "&:hover": {
                                backgroundColor: "#1B5E20",
                              },
                            }}
                            onClick={() => {
                              globalPrompt.onOpen({
                                type: "warning",
                                content: t("entity_approved"),
                                promptProps: {
                                  hideActions: true,
                                  icon: "warning",
                                  onConfirm: async () => {
                                    await approveEntity.mutateAsync({
                                      id: row.id,
                                    });
                                    globalPrompt.onClose();
                                  },
                                  onCancel: () => {},
                                },
                              });
                            }}
                          >
                            {t("approve")}
                          </Button>

                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "none",
                              borderRadius: "8px",
                              padding: "6px 16px",
                              "&:hover": {
                                backgroundColor: "#B71C1C",
                              },
                            }}
                            onClick={() => {
                              globalPrompt.onOpen({
                                type: "warning",
                                content: t("entity_reject"),
                                promptProps: {
                                  hideActions: true,
                                  icon: "warning",
                                  onConfirm: async () => {
                                    await RejectEntity.mutateAsync({
                                      id: row.id,
                                    });
                                    globalPrompt.onClose();
                                  },
                                  onCancel: () => {},
                                },
                              });
                            }}
                          >
                            {t("reject")}
                          </Button>
                        </>
                      )}
                      <Button
                        variant="contained"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          textTransform: "none",
                          borderRadius: "8px",
                          padding: "6px 16px",
                        }}
                        onClick={() => {
                          onDetailsClick(row);
                        }}
                      >
                        {t("view")}
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          textTransform: "none",
                          borderRadius: "8px",
                          padding: "6px 16px",
                        }}
                        onClick={() => {
                          globalPrompt.onOpen({
                            type: "warning",
                            content: t("entity_delete"),
                            promptProps: {
                              hideActions: true,
                              icon: "warning",
                              onConfirm: async () => {
                                await deleteEntity.mutateAsync({
                                  EntityId: row.id,
                                });
                                globalPrompt.onClose();
                              },
                              onCancel: () => {},
                            },
                          });
                        }}
                      >
                        {t("delete")}
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

export default EntitiesView;
