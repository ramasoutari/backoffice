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

const ApplicationDetails = ({ ApplicationNumber }) => {
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
      fieldVariable: "environmentalAttachment",
      label: "environmentalAttachment",
      placeholder: "environmentalAttachment",
      type: "input",
      typeValue: "string",
      disabled: true,
      // value: ApplicationNumber.environmentalAttachment,
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
      fieldVariable: "soilTestAttachment",
      label: "soilTestAttachment",
      placeholder: "soilTestAttachment",
      type: "input",
      typeValue: "string",
      disabled: true,
      // value: ApplicationNumber.soilTestAttachment,
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
      fieldVariable: "notes",
      label: "notes",
      placeholder: "notes",
      // value: ApplicationNumber.notes,
      type: "input",
      typeValue: "string",
      disabled: true,
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
      fieldVariable: "additional_attachments",
      label: "additional_attachments",
      placeholder: "additional_attachments",
      type: "input",
      typeValue: "string",
      disabled: true,
      // value: ApplicationNumber.additional_attachments,
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
      label: "phoneNumber",
      placeholder: "phoneNumber",
      value: "5",
      type: "input",
      typeValue: "string",
      disabled: true,
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
      value: "test test test",
      disabled: true,
      multiline: true,
      rows: 4,
      gridOptions: [
        {
          breakpoint: "xs",
          size: 4,
        },
      ],
    },
  ]);

  const defaultValues = useMemo(
    () => ({
      environmentalAttachment: ApplicationNumber?.environmentalAttachment,
      soilTestAttachment: ApplicationNumber?.soilTestAttachment,
      notes: ApplicationNumber?.notes,
      additional_attachments: ApplicationNumber?.additional_attachments,
      PhoneNumber: ApplicationNumber?.PhoneNumber,
      email: ApplicationNumber?.email,
    }),
    [ApplicationNumber]
  );
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
      <Stack
        sx={{ padding: 2, justifyContent: "center", alignItems: "center" }}
        direction="row"
        gap={10}
      >
        <Typography>
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {t("order_status")} :
          </Typography>{" "}
          <Typography component="span">
            {ApplicationNumber?.exteriorReply || "مرفوض"}
          </Typography>
        </Typography>

        <Typography>
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {t("applicantName")} :
          </Typography>{" "}
          <Typography component="span">
            {ApplicationNumber?.applicantName || "راما سعيد سليمان السوطري"}
          </Typography>
        </Typography>

        <Typography>
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {t("order_number")} :
          </Typography>{" "}
          <Typography component="span">
            {ApplicationNumber?.applicationNumber || "2222222"}
          </Typography>
        </Typography>
      </Stack>

      <Stack
        sx={{
          my: 3,
          justifyContent: "center",
          alignItems: "center", // Center horizontally
          flex: 1,
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          {t("form")}
        </Typography>
      </Stack>

      <Box sx={{ direction }}>
        <DynamicForm
          {...form}
          ref={formRef}
          onFormValuesChange={(values) => {}}
          defaultValues={defaultValues}
          validationMode="onChange"
          onSubmit={(values) => globalDialog.onClose()}
          submitButtonProps={{
            hidden: true,
          }}
          loading={true}
        />
        <Stack direction="row" gap={2} my={2} mx={7}>
          <Button
            variant="contained"
            onClick={handleApprove}
            sx={{
              backgroundColor: "green",
              color: "white",
              width: "327.03px",
              height: "41.48px",
              borderRadius: "8px",
            }}
          >
            {t("approve")}
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF4242",
              color: "white",
              width: "327.03px",
              height: "41.48px",
              borderRadius: "8px",
            }}
            onClick={() => handleOpenDialog("rejected")}
          >
            {t("reject")}
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#C06F34",
              color: "white",
              width: "327.03px",
              height: "41.48px",
              borderRadius: "8px",
            }}
            onClick={() => handleOpenDialog("edit")}
          >
            {t("need_edit")}
          </Button>
        </Stack>
      </Box>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-paper": {
            width: "684px",
            height: "400.71px",
            position: "absolute",
            borderRadius: "8px", // Optional: Adds rounded corners
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

export default ApplicationDetails;
