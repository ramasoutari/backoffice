import { Alert, Box, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SanadLoginButton from "./sanad-login-button";
import { t } from "i18next";
import { PATH_AFTER_LOGIN } from "../../config-global";
import { useRouter } from "../../routes/hooks";
import { useAuthContext } from "../../auth/hooks";
import useTabs from "../../hooks/use-tabs";
import DynamicForm, { getForm } from "../../components/dynamic-form";
import { useLocales } from "../../locales";
import { RouterLink } from "../../routes/components";
import { paths } from "../../routes/paths";

export default function JwtIndividualLoginView() {
  const loginTabs = useTabs(["persons", "establishments"]);

  const router = useRouter();
  const { login, loginWithSanad } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLocales();
  const form = getForm([
    {
      label: "national_id",
      fieldVariable: "national_id",
      type: "input",
      inputType: "numeric-text",
      typeValue: "string",
      value: "",
      placeholder: "national_id",
      gridOptions: [
        {
          breakpoint: "lg",
          size: 12,
        },
      ],
      validations: [
        {
          type: "required",
          message: t("required"),
        },
        {
          type: "minLength",
          value: 10,
          message: t("Wrong_national_id"),
        },
        {
          type: "maxLength",
          value: 11,
          message: t("Wrong_national_id"),
        },
      ],
    },
    {
      label: "password",
      fieldVariable: "password",
      placeholder: "password",
      type: "input",
      inputType: "password",
      typeValue: "string",
      // value: 'Password123!',
      gridOptions: [
        {
          breakpoint: "lg",
          size: 12,
        },
      ],
      validations: [
        {
          type: "required",
          message: t("required"),
        },
        {
          type: "pattern",
          value: /^(?=(.*\d))(?=.*[a-zA-Z])(?=.*[!@#$%])[0-9a-zA-Z!@#$%]/,
          message: t("Password_schema_error"),
        },
        {
          type: "minLength",
          value: 8,
          message: t("Password_length_error_short"),
        },
        {
          type: "maxLength",
          value: 32,
          message: t("Password_length_error_long"),
        },
      ],
    },
  ]);

  const defaultValues = {
    ...form.defaultValues,
  };

  const handleSubmit = async (data) => {
    const { national_id, password } = data;

    const payload = {
      NationalNo: national_id,
      Password: password,
    };
    let loginFnc = login;

    try {
      setLoading(true);
      await loginFnc?.(payload, () => {
        router.push(PATH_AFTER_LOGIN);
        setLoading(false);
      });
    } catch (error) {
      console.error(error.message);
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack spacing={4} alignContent="center">
        {!!errorMsg && <Alert severity="error">{t("Wrong_Credentials")}</Alert>}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {
            <DynamicForm
              {...form}
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
              submitButtonProps={{
                label: t("login"),
                width:"100%",
                alignment: "center",
                loading,
              }}
            />
          }
        </Stack>
        <Typography variant="body2" color="inherit">
          <RouterLink to={paths.auth.jwt.forgotPassword}>
            {t("forgot_password")}
          </RouterLink>
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        gap={2}
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          mt: 2,
        }}
      >
        {/* <Button
              fullWidth
              variant="outlined"
              component={RouterLink}
              to={paths.auth.jwt.register}
            >
              {t('register')}
            </Button> */}
      </Stack>
    </Box>
  );
}
