import {
  Container,
  Card,
  Button,
  Stack,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useLocales } from "../../locales";
import { useSettingsContext } from "../../components/settings/context";
import i18n from "../../locales/i18n";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Label from "../../components/label";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Table from "../../components/table copy/table";
import {
  GlobalDialog,
  useGlobalDialogContext,
} from "../../components/global-dialog";
import ApplicationDetails from "./dialogs/application-details";
import AddUserDialog from "./dialogs/add-user-dialog";

const UsersView = () => {
  const settings = useSettingsContext();
  const { t } = useLocales();
  const direction = i18n.language === "ar" ? "ltr" : "rtl";
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const globalDialog = useGlobalDialogContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({ items: [] });

  const dummyUsers = [
    {
      id: "12345",
      nationalNumber: "987654321",
      firstName: "John",
      fatherName: "Michael",
      grandfatherName: "Robert",
      familyName: "Doe",
      username: "johndoe",
      phoneNumber: "+1234567890",
      email: "johndoe@example.com",
      deactivated: false,
      department: "هيئة الطاقة والمعادن",
      isDeleted: false,
      deletedAt: null,
    },
    {
      id: "67890",
      nationalNumber: "123456789",
      firstName: "Jane",
      fatherName: "William",
      grandfatherName: "Edward",
      familyName: "Smith",
      username: "janesmith",
      phoneNumber: "+9876543210",
      email: "janesmith@example.com",
      department: "الدفاع المدني",
      deactivated: true,
      isDeleted: false,
      deletedAt: null,
    },
  ];

  const columns = [
    {
      id: "nationalNumber",
      label: t("national_id"),
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
        <Label variant="ghost" sx={{}}>
          {row[column.id]}
        </Label>
      ),
    },
    {
      id: "deactivated",
      label: t("status"),
      renderRow: (row) => (
        <Label variant="ghost" sx={{}}>
          {row.deactivated ? t("deactivated") : t("activated")}
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
    if (dummyUsers) {
      setData({ items: dummyUsers });
    } else {
      setData({ items: [] });
    }

    setLoading(false);
  }, []);

  const onDetailsClick = () => {
    globalDialog.onOpen({
      title: t("register_user"),
      content: <AddUserDialog />,
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
        <Stack direction="row" alignItems="center" sx={{ p: 4, width: "100%" }}>
          <Button
            variant="outlined"
            onClick={() => onDetailsClick()}
            sx={{
              width: "419.32px",
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
                width: "100%",
                height: "716px",
                borderRadius: "4px",
                border: "1px solid black",
                position: "center",
              }}
            >
              <Table
                columns={Array.isArray(columns) ? columns : []} // Ensure columns is an array
                loading={loading}
                rows={Array.isArray(data.items) ? data.items : []}
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
                      <IconButton color="primary">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="warning"
                        onClick={() => console.log("Edit", row)}
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => console.log("Delete", row)}
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
