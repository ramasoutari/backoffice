// ----------------------------------------------------------------------

import { useEffect, useMemo } from "react";
import { useAuthContext } from "../../../auth/hooks";
import { useBoolean } from "../../../hooks/use-boolean";
import { useResponsive } from "../../../hooks/use-responsive";
import { useLocales } from "../../../locales";
import { Stack } from "@mui/system";
import { Badge, Button, IconButton, List, Typography } from "@mui/material";
import Scrollbar from "../../../components/scrollbar";
import NotificationItem from "./notification-item";
import { TableNoData } from "../../../components/table";
import { paths } from "../../../routes/paths";
import { RouterLink } from "../../../routes/components";
import SvgColor from "../../../components/svg-color";
// import {
//   useGetUserUnreadNotifications,
//   useMarkNotificationsAsRead,
// } from "../../../api/notifications.api";
// import { useNotification } from "../../../providers/notifications.provider";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function NotificationsPopover() {
  const drawer = useBoolean();
  const { refetchUser } = useAuthContext();
  // const { notificationTrigger } = useNotification();
  const { t } = useLocales();

  const smUp = useResponsive("up", "sm");

  // const getLatestUnreadNotifications = useGetUserUnreadNotifications(true);
  // const setNotificationsAsRead = useMarkNotificationsAsRead();

  // const latestUnreadNotifications = useMemo(() => {
  //   return getLatestUnreadNotifications.data || [];
  // }, [getLatestUnreadNotifications.data]);

  // useEffect(() => {
  //   if (notificationTrigger) {
  //     refetchUser();
  //     getLatestUnreadNotifications.refetch();
  //   }
  // }, [notificationTrigger]);

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {t("latest_unread_notifications")}
      </Typography>

      <Button size="small" onClick={drawer.onFalse}>
        {t("close")}
      </Button>
    </Stack>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {/* {latestUnreadNotifications.length > 0 ? (
          <>
            {latestUnreadNotifications.map((item, index) => (
              <NotificationItem
                key={index}
                notification={{
                  ...item,
                  message: item.message,
                  type: item.type,
                }}
                // setNotificationAsRead={(id) => {
                //   setNotificationsAsRead.mutateAsync({ ids: [id] });
                // }}
              />
            ))}
          </>
        ) : (
          <TableNoData notFound text={t("empty_notifications")} />
        )} */}
      </List>
    </Scrollbar>
  );

  return (
    <>
      <IconButton
        // component={m.button}
        // whileTap="tap"
        // whileHover="hover"
        // variants={varHover(1.05)}
        // color={drawer.value ? 'primary' : 'default'}
        LinkComponent={RouterLink}
        href={paths.dashboard.notification_center}
      >
        <Badge
          variant="dot"
          color="error"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "2px solid",
              borderColor: "background.paper",
              // ...(latestUnreadNotifications?.length === 0 && {
              //   borderWidth: 0,
              //   background: 'transparent',
              // }),
            },
          }}
        >
          <IconButton aria-label="notification" color="primary">
            <NotificationsIcon />
          </IconButton>
        </Badge>
      </IconButton>

      {/* <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}
        <Divider />
        {renderList}
        <Divider />
        <Box sx={{ p: 1 }}>
          <Button
            LinkComponent={RouterLink}
            href={paths.dashboard.notification_center}
            fullWidth
            size="large"
          >
            {t('view_all')}
          </Button>
        </Box>
      </Drawer> */}
    </>
  );
}
