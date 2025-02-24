import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGlobalDialogContext } from "../../../components/global-dialog";
import { useLocales } from "../../../locales";
import DynamicForm, { getForm } from "../../../components/dynamic-form";
import i18n from "../../../locales/i18n";
import { Stack } from "@mui/system";
import { useGlobalPromptContext } from "../../../components/global-prompt";
import { color } from "framer-motion";
import { options } from "numeral";

const AddUserDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [loading, setLoading] = useState(false);
  const globalDialog = useGlobalDialogContext();
  const globalPrompt = useGlobalPromptContext();
  const { t } = useLocales();
  const formRef = useRef();
  const direction = i18n.language === "ar" ? "ltr" : "rtl";
  const form = getForm([
    {
      fieldVariable: "nationalNumber",
      label: "national_id",
      placeholder: "national_id",
      value: "",
      type: "input",
      typeValue: "string",
      gridOptions: [
        {
          breakpoint: "xs",
          size: 12,
        },
        {
          breakpoint: "md",
          size: 4,
        },
      ],
    },
    {
      fieldVariable: "firstName",
      label: "firstName",
      placeholder: "firstName",
      type: "input",
      typeValue: "string",
      value: "",
      gridOptions: [
        {
          breakpoint: "xs",
          size: 12,
        },
        {
          breakpoint: "md",
          size: 4,
        },
      ],
    },
    {
      fieldVariable: "fatherName",
      label: "fatherName",
      placeholder: "fatherName",
      type: "input",
      typeValue: "string",
      value: "",
      gridOptions: [
        {
          breakpoint: "xs",
          size: 12,
        },
        {
          breakpoint: "md",
          size: 4,
        },
      ],
    },
    {
      fieldVariable: "grandfatherName",
      label: "grandfatherName",
      placeholder: "grandfatherName",
      value: "",
      type: "input",
      typeValue: "string",
      gridOptions: [
        {
          breakpoint: "xs",
          size: 12,
        },
        {
          breakpoint: "md",
          size: 4,
        },
      ],
    },
    {
      fieldVariable: "familyName",
      label: "last_name",
      placeholder: "last_name",
      type: "input",
      typeValue: "string",
      value: "",
      gridOptions: [
        {
          breakpoint: "xs",
          size: 12,
        },
        {
          breakpoint: "md",
          size: 4,
        },
      ],
    },
    {
      fieldVariable: "phoneNumber",
      label: "phone_number",
      placeholder: "phone_number",
      value: "",
      type: "input",
      typeValue: "string",
      gridOptions: [
        {
          breakpoint: "xs",
          size: 12,
        },
        {
          breakpoint: "md",
          size: 4,
        },
      ],
    },
    {
      fieldVariable: "email",
      label: "email",
      placeholder: "email",
      type: "input",
      typeValue: "string",
      value: "",
      multiline: true,
      rows: 4,
      gridOptions: [
        {
          breakpoint: "xs",
          size: 4,
        },
      ],
    },
    {
      fieldVariable: "departmentId",
      label: "department",
      placeholder: "department",
      type: "select",
      typeValue: "string",
      value: "",
      options: [
        {
          label: "الدفاع المدني",
          value: "002",
        },
        {
          label: "هيئة الطاقة والمعادن",
          value: "001",
        },
        {
          label: "مديرية الوقاية والحماية ",
          value: "001",
        },
      ],
      gridOptions: [
        {
          breakpoint: "xs",
          size: 12,
        },
        {
          breakpoint: "md",
          size: 4,
        },
        {
          breakpoint: "lg",
          size: 4,
        },
      ],
      validations: [
        {
          type: "required",
          message: t("required"),
        },
      ],
    },
  ]);

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setReason("");
  };
  const handleApprove = () => {
    globalPrompt.onOpen({
      type: "success",
      content: (
        <Stack direction="column" spacing={1}>
          <Typography component="h6" variant="h6" fontWeight="fontWeightBold">
            {t("successfully")}
          </Typography>
        </Stack>
      ),
      promptProps: {
        icon: "success",
      },
    });
  };

  useEffect(() => {
    // Simulate async operation (fetching data, etc.)
    setLoading(false);
  }, []);
  return (
    <Box sx={direction} py={3}>
      <Box sx={{ direction }}>
        <DynamicForm
          {...form}
          ref={formRef}
          onFormValuesChange={(values) => {}}
          validationMode="onChange"
          onSubmit={(values) => globalDialog.onClose()}
          extraButtons={
            <Button
              variant="contained"
              onClick={() => {
                globalDialog.onClose();
              }}
              sx={{
                width: "516.08px",
                height: "48px",
                borderRadius: "8px",
                backgroundColor: "#B0B0B0",
                color: "white",
                "&:hover": {
                  backgroundColor: "#9A9A9A",
                },
              }}
            >
              {t("cancel")}
            </Button>
          }
          submitButtonProps={{
            label: t("add"),
            backgroundColor: "#3FAF47",
            alignment: "center",
            width: "728.48px",
            height: "62px",
            color: "white",
          }}
        />
      </Box>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-paper": {
            width: "684px",
            height: "400.71px",
            position: "absolute",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {dialogType === "rejected" ? t("rejection_reason") : t("edit_needed")}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={9}
            label={t("write_here")}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            paddingBottom: "20px",
          }}
        >
          <Button
            sx={{
              color: "white",
              backgroundColor: "#B0B0B0",
              width: "187.03px",
              height: "41.48px",
              borderRadius: "8px",
            }}
            onClick={handleCloseDialog}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green",
              color: "white",
              width: "187.03px",
              height: "41.48px",
              borderRadius: "8px",
            }}
          >
            {t("send")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddUserDialog;
