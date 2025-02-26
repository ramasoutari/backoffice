import { Box, Button } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useGlobalDialogContext } from "../../../components/global-dialog";
import { useLocales } from "../../../locales";
import DynamicForm, { getForm } from "../../../components/dynamic-form";
import i18n from "../../../locales/i18n";

const ViewEntityDialog = ({ entity, viewOnly = true }) => {
  const globalDialog = useGlobalDialogContext();
  const { t } = useLocales();

  const [isLoading, startLoading] = useState(false);
  const direction = i18n.language === "ar" ? "ltr" : "rtl";
  console.log("entity", entity);
  const form = getForm([
    {
      fieldVariable: "entityNumber",
      label: "entityNumber",
      placeholder: "entityNumber",
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
      fieldVariable: "registrationNumber",
      label: "registrationNumber",
      placeholder: "registrationNumber",
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
      fieldVariable: "name",
      label: "entity_name",
      placeholder: "entity_name",
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
      fieldVariable: "phoneNumber",
      label: "entity_phone_number",
      placeholder: "entity_phone_number",
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
      fieldVariable: "email",
      label: "entity_email",
      placeholder: "entity_email",
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
      fieldVariable: "officerName",
      label: "officerName",
      placeholder: "officerName",
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
      fieldVariable: "officerAge",
      label: "officerAge",
      placeholder: "officerAge",
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
      fieldVariable: "officerNationalNumber",
      label: "officerNationalNumber",
      placeholder: "officerNationalNumber",
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
      fieldVariable: "officerPhoneNumber",
      label: "officerPhoneNumber",
      placeholder: "officerPhoneNumber",
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
      fieldVariable: "officerEmail",
      label: "officerEmail",
      placeholder: "officerEmail",
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
  ]);

  const defaultValues = useMemo(() => {
    return {
      name: entity.name || "",
      registrationNumber: entity.registrationNumber || "",
      entityNumber: entity?.entityNumber || "",
      officerName: entity?.officerName || "",
      officerAge: entity?.officerAge || "",
      officerNationalNumber: entity?.officerNationalNumber || "",
      officerPhoneNumber: entity?.officerPhoneNumber || "",
      phoneNumber: entity?.phoneNumber || "",
      email: entity?.email || "",
      officerEmail: entity?.officerEmail || "",
    };
  }, [entity]);

  return (
    <Box sx={direction} py={3}>
      <Box sx={{ direction }}>
        <DynamicForm
          {...form}
          defaultValues={defaultValues}
          onFormValuesChange={(values) => {}}
          validationMode="onChange"
          extraButtons={
            <Button
              variant="contained"
              onClick={() => {
                globalDialog.onClose();
              }}
              sx={{
                width: "100%",
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
            hidden: true,
          }}
        />
      </Box>
    </Box>
  );
};

export default ViewEntityDialog;
