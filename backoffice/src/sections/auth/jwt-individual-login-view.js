import { Alert, Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAuthContext } from "../../auth/hooks";
import DynamicForm, { getForm } from "../../components/dynamic-form";
import { useLocales } from "../../locales";
import { RouterLink } from "../../routes/components";
import { paths } from "../../routes/paths";
import { useLogin } from "../../api/auth.api";

export default function JwtIndividualLoginView() {
  const { login } = useAuthContext();
  const loginFnc = useLogin();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLocales();
  const form = getForm([
    {
      label: "username",
      fieldVariable: "username",
      type: "input",
      inputType: "string",
      typeValue: "string",
      value: "",
      placeholder: "username",
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
      ],
    },
  ]);

  const defaultValues = {
    ...form.defaultValues,
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    loginFnc.mutate(
      {
        username: data.username,
        password: data.password,
      },
      {
        onSuccess: (res) => {
          setLoading(false);
          login(res.sessionId, res.token);
        },
        onError: (error) => {
          if (error.status === 401 || error.status === 404) {
            setErrorMsg(t("wrong_credentials"));
          } else {
            setErrorMsg(error.message);
          }
          setLoading(false);
        },
      }
    );
  };

  return (
    <Box>
      <Stack spacing={4} alignContent="center">
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

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
                width: "100%",
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
