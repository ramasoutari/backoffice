// ----------------------------------------------------------------------

import { Button, ListItemText, Typography } from "@mui/material";
import { useLocales } from "../../../locales";
import { useRouter } from "../../../routes/hooks";
import { Box, Stack } from "@mui/system";
import { paths } from "../../../routes/paths";

export default function NotificationItem({
  notification,
  setNotificationAsRead,
  inList,
}) {
  const { t } = useLocales();
  const { push } = useRouter();

  const handleBtnClick = (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    if (callback) callback();
    if (setNotificationAsRead) setNotificationAsRead(notification.id);
  };

  const renderText = (
    <ListItemText
      disableTypography
      onClick={() => {}}
      primary={
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" color="text.primary" noWrap>
              {notification.subTitle}
            </Typography>
            <Typography variant="caption" color="secondary.main">
              {/* {fToNow(notification.created_at)} */}
            </Typography>
          </Box>
        </>
      }
      secondary={
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight="fontWeightBold"
              color="text.primary"
              noWrap
            >
              {notification.title}
            </Typography>
            <Box
              sx={{
                borderRadius: "50%",
                bgcolor: "primary.main",
                position: "absolute",
              }}
            />
          </Box>
          {reader(notification.message)}
        </>
      }
    />
  );

  const taskAction = (
    <Stack spacing={1} direction="row" sx={{ mt: 1.5 }}>
      <Button
        onClick={(e) =>
          handleBtnClick(e, () => {
            // push(paths.dashboard.tasks.root + `?taskGUID=${notification?.task_id}`);
          })
        }
        size="small"
        variant="contained"
      >
        {t("show_task")}
      </Button>
    </Stack>
  );

  const investigationAction = (
    <Stack spacing={1} direction="row" sx={{ mt: 1.5 }}>
      <Button
        onClick={(e) =>
          handleBtnClick(e, () => {
            push(
              paths.dashboard.investigation.caseProfile(notification?.task_id)
            );
          })
        }
        size="small"
        variant="contained"
      >
        {t("show_profile")}
      </Button>
    </Stack>
  );

  const friendAction = (
    <Stack spacing={1} direction="row" sx={{ mt: 1.5 }}>
      <Button size="small" variant="contained">
        Accept
      </Button>
      <Button size="small" variant="outlined">
        Decline
      </Button>
    </Stack>
  );

  const changePasswordAction = (
    <Stack
      alignItems="flex-end"
      sx={{
        mt: 1.5,
      }}
    >
      <Button size="small" variant="contained" color="secondary">
        {t("change_password")}
      </Button>
    </Stack>
  );

  const ContainerEL = inList ? ListItemText : ListItemText;

  return (
    <ContainerEL
      disableRipple
      sx={{
        p: inList ? 0 : 2.5,
        alignItems: "flex-start",
        ...(!inList && {
          borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        }),
      }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        {renderText}
        {/* {notification.type === 'change_password' && changePasswordAction} */}
        {[
          "INVESTIGATION_PROFILE_RECOMMENDATION",
          "INVESTIGATION_PROFILE_MESSAGING",
          "INVESTIGATION_PROFILE_REFRESH",
          "REQUEST_PREV_PROFILES",
          "APPROVE_PREV_PROFILES",
          "REJECT_PREV_PROFILES",
          "REQUEST_CONFIRM_PROFILE",
          "APPROVE_CONFIRM_PROFILE",
          "REJECT_CONFIRM_PROFILE",
        ].includes(notification.type) && investigationAction}
        {["NEW_INVESTIGATION", "TASK_RECOMMENDATION", "TASK_TRANSFER"].includes(
          notification.type
        ) && taskAction}
      </Stack>
    </ContainerEL>
  );
}

NotificationItem.propTypes = {
  // notification: PropTypes.object,
};

// ----------------------------------------------------------------------

function reader(data) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        color: "text.secondary",
        "& p": { typography: "body2", m: 0 },
        "& a": { color: "inherit", textDecoration: "none" },
        "& strong": { typography: "subtitle2" },
      }}
    />
  );
}
