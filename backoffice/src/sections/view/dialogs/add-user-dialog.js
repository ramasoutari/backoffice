import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useGlobalDialogContext } from "../../../components/global-dialog";
import { useLocales } from "../../../locales";
import DynamicForm, { getForm } from "../../../components/dynamic-form";

import { useRegisterUser, useUpdateUser } from "../../../api/users.api";
import toast from "react-hot-toast";
import { useGlobalPromptContext } from "../../../components/global-prompt";
import { Stack } from "@mui/system";

const AddUserDialog = ({ user, viewOnly = false }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [dialogType, setDialogType] = useState("");
  const globalDialog = useGlobalDialogContext();
  const { t } = useLocales();
  const registerUser = useRegisterUser();
  const updateUser = useUpdateUser();
  const globalPrompt = useGlobalPromptContext();

  const [isLoading, startLoading] = useState(false);
  const form = getForm([
    {
      fieldVariable: "nationalNumber",
      label: "national_id",
      placeholder: "national_id",
      value: "",
      disabled: viewOnly || Boolean(user),
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
      validations: [
        {
          type: "required",
          message: t("required"),
        },
      ],
    },
    {
      fieldVariable: "firstName",
      label: "firstName",
      placeholder: "firstName",
      type: "input",
      disabled: viewOnly,
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
      validations: [
        {
          type: "required",
          message: t("required"),
        },
      ],
    },
    {
      fieldVariable: "fatherName",
      label: "fatherName",
      placeholder: "fatherName",
      type: "input",
      disabled: viewOnly,
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
      validations: [
        {
          type: "required",
          message: t("required"),
        },
      ],
    },
    {
      fieldVariable: "grandfatherName",
      label: "grandfatherName",
      placeholder: "grandfatherName",
      value: "",
      disabled: viewOnly,
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
      validations: [
        {
          type: "required",
          message: t("required"),
        },
      ],
    },
    {
      fieldVariable: "familyName",
      label: "last_name",
      placeholder: "last_name",
      type: "input",
      disabled: viewOnly,
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
      validations: [
        {
          type: "required",
          message: t("required"),
        },
      ],
    },
    {
      fieldVariable: "phoneNumber",
      label: "phone_number",
      placeholder: "phone_number",
      value: "",
      disabled: viewOnly,
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
      validations: [
        {
          type: "required",
          message: t("required"),
        },
      ],
    },
    {
      fieldVariable: "email",
      label: "email",
      placeholder: "email",
      type: "input",
      disabled: viewOnly,
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
      validations: [
        {
          type: "required",
          message: t("required"),
        },
      ],
    },
    {
      fieldVariable: "departmentId",
      label: "department",
      placeholder: "department",
      type: "select",
      disabled: viewOnly,
      typeValue: "string",
      value: "",
      optionsSourceType: "api",
      optionsSourceApi: "/departments",
      optionsSourceApiDataKey: "departments",
      optionsSourceApiLabelKey: "nameAr",
      optionsSourceApiValueKey: "id",
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
    {
      fieldVariable: "roleIds",
      label: "role",
      placeholder: "role",
      type: "select",
      disabled: viewOnly,
      typeValue: "array",
      value: [],
      isAffectedByOtherFields: true,
      row: true,
      affectingFields: [
        {
          fieldName: "departmentId",
          paramKey: "depId",
        },
      ],
      multiple: true,
      optionsSourceType: "api",
      optionsSourceApi: "/department/{{depId}}/roles",
      optionsSourceApiDataKey: "roles",
      optionsSourceApiLabelKey: "role",
      optionsSourceApiValueKey: "id",
      optionsSourceApiParamsStrategy: "params",
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

  const defaultValues = useMemo(() => {
    return {
      nationalNumber: user?.username || "",
      firstName: user?.firstName || "",
      fatherName: user?.fatherName || "",
      grandfatherName: user?.grandfatherName || "",
      familyName: user?.familyName || "",
      phoneNumber: user?.phoneNumber || "",
      email: user?.email || "",
      departmentId: user?.department?.id || "",
      roleIds: Array.isArray(user?.roles)
        ? user?.roles.map((role) => role.id)
        : [],
    };
  }, [user]);

  const onSubmit = (data) => {
    if (isLoading) return;
    if (!user) {
      startLoading(async () => {
        await registerUser.mutateAsync({
          nationalNumber: data.nationalNumber,
          firstName: data.firstName,
          fatherName: data.fatherName,
          grandfatherName: data.grandfatherName,
          familyName: data.familyName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          departmentId: data?.departmentId,
          roleIds: data.roleIds,
        });
        globalDialog.onClose();
        globalPrompt.onOpen({
          type: "success",
          content: (
            <Stack direction="column" spacing={1}>
              <Typography
                component="h6"
                variant="h6"
                fontWeight="fontWeightBold"
              >
                {t("successfully_submitted")}
              </Typography>
            </Stack>
          ),
          promptProps: {
            icon: "success",
          },
        });
      });
    } else {
      startLoading(async () => {
        await updateUser.mutateAsync({
          id: user.id,
          data: {
            nationalNumber: data.nationalNumber,
            firstName: data.firstName,
            fatherName: data.fatherName,
            grandfatherName: data.grandfatherName,
            familyName: data.familyName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            departmentId: data?.departmentId,
            roleIds: data.roleIds,
          },
        });
        globalDialog.onClose();
        globalPrompt.onOpen({
          type: "success",
          content: (
            <Stack direction="column" spacing={1}>
              <Typography
                component="h6"
                variant="h6"
                fontWeight="fontWeightBold"
              >
                {t("successfully_submitted")}
              </Typography>
            </Stack>
          ),
          promptProps: {
            icon: "success",
          },
        });
      });
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setReason("");
  };

  return (
    <Box sx={{ position: "inherit", overflow: "hidden" }} py={3}>
      <Box sx={{ position: "inherit" }}>
        <DynamicForm
          {...form}
          defaultValues={defaultValues}
          onFormValuesChange={(values) => {}}
          validationMode="onChange"
          onSubmit={onSubmit}
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
            position: "fixed",
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
        {viewOnly ? (
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
                width: "100%",
                height: "41.48px",
                borderRadius: "8px",
              }}
              onClick={handleCloseDialog}
            >
              {t("cancel")}
            </Button>
          </DialogActions>
        ) : (
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
        )}
      </Dialog>
    </Box>
  );
};

export default AddUserDialog;
