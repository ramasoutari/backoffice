import {
  Container,
  Card,
  Button,
  Stack,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  CardHeader,
  Typography,
} from "@mui/material";
import { useLocales } from "../../locales";
import { useSettingsContext } from "../../components/settings/context";
import i18n from "../../locales/i18n";
import { useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Label from "../../components/label";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Table from "../../components/table copy/table";
import { useGlobalDialogContext } from "../../components/global-dialog";
import AddUserDialog from "./dialogs/add-user-dialog";
import { useDeleteUser, useGetUsers } from "../../api/users.api";
import { useGlobalPromptContext } from "../../components/global-prompt";

const UsersView = () => {
  const settings = useSettingsContext();
  const { t } = useLocales();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const globalDialog = useGlobalDialogContext();
  const getUsers = useGetUsers();
  const deleteUser = useDeleteUser();
  const globalPrompt = useGlobalPromptContext();

  const usersArr = useMemo(() => {
    return getUsers.data;
  }, [getUsers.data]);

  const columns = [
    {
      id: "nationalNumber",
      label: t("national_id"),
      renderRow: (row, column) => (
        <>
          {(!row.isMigrated && !(row?.applicationType?.length > 0)) ||
          [].includes(row?.applicationType) ? (
            <Label variant="ghost">
              {row[column.id]}
            </Label>
          ) : (
            row[column.id]
          )}
        </>
      ),
    },
    {
      id: "firstName",
      label: t("firstName"),
      renderRow: (row, column) => (
        <Label variant="ghost" sx={{}}>
          {row[column.id]}
        </Label>
      ),
    },
    {
      id: "email",
      label: t("email"),
      renderRow: (row, column) => (
        <Label variant="ghost" sx={{}}>
          {row[column.id]}
        </Label>
      ),
    },
    {
      id: "department",
      label: t("department"),
      renderRow: (row, column) => (
        <Label variant="ghost"> {row[column.id]?.nameAr ?? "-"}</Label>
      ),
    },
    {
      id: "roles",
      label: t("role"),
      renderRow: (row, column) => (
        <Label variant="ghost">
          {Array.isArray(row[column.id]) && row[column.id].length > 0
            ? row[column.id].map((role) => role.role).join(", ")
            : "-"}
        </Label>
      ),
    },

    {
      id: "deactivated",
      label: t("status"),
      renderRow: (row) => (
        <Label variant="ghost">
          {row.deactivated ? t("deactivated") : t("activated")}
        </Label>
      ),
    },
    {
      type: "actions",
      label: t("action"),
      align: "center",
    },
  ];

  const onDetailsClick = (user) => {
    globalDialog.onOpen({
      title: t("view_user"),
      content: <AddUserDialog user={user} viewOnly={true} />,
      dialogProps: {
        maxWidth: "lg",
      },
    });
  };

  const handleEdit = (user) => {
    globalDialog.onOpen({
      title: t("update_user"),
      content: <AddUserDialog user={user} />,
      dialogProps: {
        dismissable: true,
        maxWidth: "lg",
      },
    });
  };
  const onRegisterClick = () => {
    globalDialog.onOpen({
      title: t("register_user"),
      content: <AddUserDialog />,
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
      <Card>
        <Stack direction="row" alignItems="center" sx={{ p: 2 }}>
          <Button
            variant="outlined"
            onClick={() => onRegisterClick()}
            sx={{
              width: "288.32px",
              height: "41.48px",
              borderRadius: "8px",
              borderWidth: "2px",
              borderColor: "black",
              mr: 2,
            }}
          >
            <PersonAddIcon />
            {t("register_user")}
          </Button>
          <TextField
            variant="outlined"
            placeholder={t("search")}
            sx={{
              width: "850.11px",
              height: "41.48px",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid black",
                },
                "&:hover fieldset": {
                  border: "2px solid black",
                },
                "&.Mui-focused fieldset": {
                  border: "2px solid black",
                },
                padding: "1",
                height: "100%",
                display: "flex",
                alignItems: "center",
              },
              margin: "0",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
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
                borderRadius: "8px",
                border: "1px solid black",
                overflow: "hidden",
                position: "center",
              }}
            >
              <Table
                columns={columns}
                loading={getUsers.isFetching}
                rows={usersArr || []}
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
                      {" "}
                      <IconButton color={row.deactivated ? "error" : "success"}>
                        <RadioButtonCheckedIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          onDetailsClick(
                            usersArr.find((user) => user.id === row.id)
                          )
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="warning"
                        onClick={() =>
                          handleEdit(
                            usersArr.find((user) => user.id === row.id)
                          )
                        }
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          globalPrompt.onOpen({
                            type: "warning",
                            content: t("delete_user"),
                            promptProps: {
                              hideActions: true,
                              icon: "warning",
                              onConfirm: async () => {
                                await deleteUser.mutateAsync({ id: row.id });
                                globalPrompt.onClose();
                              },
                              onCancel: () => {},
                            },
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
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

export default UsersView;
