import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGlobalDialogContext } from "../../../components/global-dialog";
import { useLocales } from "../../../locales";
import DynamicForm, { getForm } from "../../../components/dynamic-form";
import i18n from "../../../locales/i18n";
import { Stack } from "@mui/system";
import { useGlobalPromptContext } from "../../../components/global-prompt";
import {
  useGetApplication,
  useSubmitApplication,
} from "../../../api/appliactions.api";
import { LoadingScreen } from "../../../components/loading-screen";
import { HOST_API } from "../../../config-global";
import Iconify from "../../../components/iconify";

const ApplicationDetails = ({ ApplicaitonNumber }) => {
  const [currentDialog, setCurrentDialog] = useState(-1);
  const [reason, setReason] = useState("");
  const [type, setType] = useState();
  const [title, setTitle] = useState("");
  const [dialogType, setDialogType] = useState("");
  const globalDialog = useGlobalDialogContext();
  const globalPrompt = useGlobalPromptContext();
  const getApplication = useGetApplication();
  const submitApplication = useSubmitApplication();

  const { t } = useLocales();
  const formRef = useRef();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    if (ApplicaitonNumber) {
      getApplication.mutate({
        id: ApplicaitonNumber,
      });
    }
  }, [ApplicaitonNumber]);

  const applicationInfo = getApplication.data?.application;
  const stepDataInfo = getApplication.data?.stepData;

  const form = getForm([
    {
      fieldVariable: "extraInfo",
      label: "notes",
      placeholder: "notes",
      value: "",
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
      fieldVariable: "phoneNumber",
      label: "phone_number",
      placeholder: "phone_number",
      value: "",
      type: "input",
      typeValue: "string",
      disabled: true,
      validations: [
        {
          type: "required",
          message: t("required"),
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
      ],
    },
    {
      fieldVariable: "email",
      label: "email",
      placeholder: "email",
      type: "input",
      typeValue: "string",
      value: "",
      disabled: true,
      multiline: true,
      validations: [
        {
          type: "required",
          message: t("required"),
        },
      ],
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
      environmentalAttachment:
        applicationInfo?.environmantalAttachments?.[0]?.id || "",
      soilAttachments: applicationInfo?.soilAttachments?.[0]?.id || "",
      extraInfo: applicationInfo?.extraInfo || "",
      additional_attachments:
        applicationInfo?.additional_attachments?.[0]?.id || "",
      noObjectionAttachment:
        applicationInfo?.noObjectionAttachment?.[0]?.id || "",
      phoneNumber: applicationInfo?.phoneNumber || "",
      email: applicationInfo?.email || "",
    }),
    [applicationInfo]
  );

  const handleOpenDialog = (type, index) => {
    setDialogType(type);
    setCurrentDialog(index);
  };

  const handleCloseDialog = () => {
    setCurrentDialog(-1);
    setReason("");
    setType("");
    setType("");
  };

  const handleSubmitReason = useCallback(() => {
    if (dialogType === "rejected") {
      submitApplication.mutate(
        {
          ApplicaitonNumber,
          currentDialog,
          rejection_reason: reason,
        },
        {
          onSuccess: () => {
            handleCloseDialog();
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
          },
        }
      );
    } else if (dialogType === "edit") {
      submitApplication.mutate(
        {
          ApplicaitonNumber,
          currentDialog,
          type,
          title,
        },
        {
          onSuccess: () => {
            handleCloseDialog();
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
          },
        }
      );
    }
  }, [
    ApplicaitonNumber,
    currentDialog,
    reason,
    title,
    type,
    dialogType,
    submitApplication,
    handleCloseDialog,
    globalPrompt,
    t,
  ]);
  const handleApprove = (buttonIndex) => {
    submitApplication.mutate(
      {
        ApplicaitonNumber,
        buttonIndex,
      },
      {},
      {
        onSuccess: () => {
          globalPrompt.onOpen({
            type: "success",
            content: (
              <Stack direction="column" spacing={1}>
                <Typography
                  component="h6"
                  variant="h6"
                  fontWeight="fontWeightBold"
                >
                  {t("successfully")}
                </Typography>
              </Stack>
            ),
            promptProps: {
              icon: "success",
            },
          });
        },
      }
    );
  };

  if (!applicationInfo) return <LoadingScreen />;

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
          <Typography component="span">{applicationInfo?.status}</Typography>
        </Typography>
        <Typography>
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {t("applicantName")} :
          </Typography>{" "}
          <Typography component="span">
            {applicationInfo?.applicantName || ""}
          </Typography>
        </Typography>

        <Typography>
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {t("order_number")} :
          </Typography>{" "}
          <Typography component="span">
            {applicationInfo?.applicationNumber || ""}
          </Typography>
        </Typography>
      </Stack>

      <Stack
        sx={{
          my: 3,
          justifyContent: "center",
          alignItems: "center",
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
        {applicationInfo.environmantalAttachments && (
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight="500" p={1}>
              {t("environmentalAttachment")}:
            </Typography>
            <Box display="flex" alignItems="center">
              {applicationInfo.environmantalAttachments.map(
                (attachId, index) => (
                  <Box key={index} display="flex" flexDirection="column" mr={1}>
                    <Button
                      onClick={() =>
                        window.open(
                          `${HOST_API}/GetAttachment/${attachId.id}`,
                          "_blank"
                        )
                      }
                      size="small"
                      sx={{
                        backgroundColor: "#e6e6e6",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography px={0.5}>{attachId.fileName}</Typography>
                      <Iconify icon={"mdi:eye"} width={15} />
                    </Button>
                  </Box>
                )
              )}
            </Box>
          </Box>
        )}
        {applicationInfo.soilAttachments && (
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight="500" p={1}>
              {t("soilTestAttachment")}:
            </Typography>
            <Box display="flex" alignItems="center">
              {applicationInfo.soilAttachments.map((attachId, index) => (
                <Box key={index} display="flex" flexDirection="column" mr={1}>
                  <Button
                    onClick={() =>
                      window.open(
                        `${HOST_API}/GetAttachment/${attachId.id}`,
                        "_blank"
                      )
                    }
                    size="small"
                    sx={{
                      backgroundColor: "#e6e6e6",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography px={0.5}>{attachId.fileName}</Typography>
                    <Iconify icon={"mdi:eye"} width={15} />
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {applicationInfo.noObjectionAttachment && (
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight="500" p={1}>
              {t("noObjectionAttachment")}:
            </Typography>
            <Box display="flex" alignItems="center">
              {applicationInfo.noObjectionAttachment.map((attachId, index) => (
                <Box key={index} display="flex" flexDirection="column" mr={1}>
                  <Button
                    onClick={() =>
                      window.open(
                        `${HOST_API}/GetAttachment/${attachId.id}`,
                        "_blank"
                      )
                    }
                    size="small"
                    sx={{
                      backgroundColor: "#e6e6e6",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography px={0.5}>{attachId.fileName}</Typography>
                    <Iconify icon={"mdi:eye"} width={15} />
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {applicationInfo.additional_attachments && (
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight="500" p={1}>
              {t("additional_attachments")}:
            </Typography>
            <Box display="flex" alignItems="center">
              {applicationInfo.soilAttachments.map((attachId, index) => (
                <Box key={index} display="flex" flexDirection="column" mr={1}>
                  <Button
                    onClick={() =>
                      window.open(
                        `${HOST_API}/GetAttachment/${attachId.id}`,
                        "_blank"
                      )
                    }
                    size="small"
                    sx={{
                      backgroundColor: "#e6e6e6",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography px={0.5}>{attachId.fileName}</Typography>
                    <Iconify icon={"mdi:eye"} width={15} />
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        <Stack direction="row" gap={2} my={2} mx={7}>
          {stepDataInfo?.to.map((item, index) => {
            if (item === "decline_application") {
              return (
                <Button
                  key={index}
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF4242",
                    color: "white",
                    width: "327.03px",
                    height: "41.48px",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleOpenDialog("rejected", index)}
                >
                  {t("reject")}
                </Button>
              );
            }

            if (item === "field_inspection") {
              return (
                <Button
                  key={index}
                  variant="contained"
                  onClick={() => handleApprove(index)}
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
              );
            }

            if (item === "extra_Info_backoffice") {
              return (
                <Button
                  key={index}
                  variant="contained"
                  sx={{
                    backgroundColor: "#C06F34",
                    color: "white",
                    width: "327.03px",
                    height: "41.48px",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleOpenDialog("edit", index)}
                >
                  {t("need_edit")}
                </Button>
              );
            }

            return null;
          })}
        </Stack>
      </Box>
      <Dialog
        open={currentDialog > -1}
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
          {dialogType === "edit" ? (
            <>
              <TextField
                fullWidth
                label={t("type_of_info")}
                select
                value={type}
                onChange={(e) => setType(e.target.value)}
                sx={{
                  mb: 2,
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
              >
                <MenuItem value="002">{t("text")}</MenuItem>
                <MenuItem value="001">{t("attachments")}</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label={t("label")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  mb: 2, // Add margin-bottom
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
            </>
          ) : (
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
          )}
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
            onClick={handleSubmitReason}
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
