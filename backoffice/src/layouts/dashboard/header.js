import PropTypes from "prop-types";
// @mui
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Box, Button, Typography } from "@mui/material";
// theme
// hooks
// components
import { AccessibilityToolbar } from "../../components/accessibility";
//
import { HEADER, NAV } from "../config-layout";
import { AccountPopover, DateTimeOverview, LanguagePopover } from "../_common";
import { useNavData } from "./config-navigation";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import HelpButton from "../_common/help-button";
import { useAuthContext } from "../../auth/hooks";
import { useSettingsContext } from "../../components/settings/context";
import { useResponsive } from "../../hooks/use-responsive";
import { bgBlur } from "../../theme/css";
import { useOffSetTop } from "../../hooks/use-off-set-top";
import i18n from "../../locales/i18n";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TranslateIcon from "@mui/icons-material/Translate";
import NotificationsPopover from "../_common/notifications-popover/notifications-popover";
import { useSkipFirstRender } from "../../hooks/use-skip-first-render";
import toast from "react-hot-toast";

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const navData = useNavData();

  const { user, initialize } = useAuthContext();

  const isNavVertical = settings.themeLayout === "vertical";

  const isNavHorizontal = settings.themeLayout === "horizontal";

  const isNavMini = settings.themeLayout === "mini";

  const lgUp = useResponsive("up", "lg");
  const smUp = useResponsive("up", "sm");

  const offset = useOffSetTop(HEADER.H_DESKTOP);
  // const { notificationTrigger, notifications } = useNotification();

  const offsetTop = offset && !isNavHorizontal;
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  const renderContent = (
    <>
      <Stack flexGrow={1} direction="row" alignItems="center">
        {smUp && (
          <>
            <IconButton aria-label="account" color="primary">
              <AccountCircleIcon />
            </IconButton>
          </>
        )}

        {/* <button
          id="nav-toggle-btn"
          type='button'
          onClick={onOpenNav}
        >asd</button> */}

        {smUp && settings.backRoute && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1, lg: 6 }}
            // sx={{
            //   mx: 2,
            // }}
          >
            {/* <Button
              LinkComponent={RouterLink}
              href={settings.backRoute}
              variant="outlined"
              sx={{
                p: 1,
                backgroundColor: 'common.white',
              }}
              startIcon={
                (currentLang.value !== "ar") ? (

                  <SvgColor
                    sx={{
                      color: 'secondary.main',
                      transform: 'scale(-1, 1)'

                    }}
                    src="/assets/icons/designer/back.svg"
                  />
                ) : (<SvgColor
                  sx={{
                    color: 'secondary.main',
                  }}
                  src="/assets/icons/designer/back.svg"
                />)
              }
            >
              {t('back')}
            </Button> */}
          </Stack>
        )}

        {user && (
          <>
            <AccountPopover />
          </>
        )}
      </Stack>
      {lgUp && (
        <Box dir={direction} sx={{ direction }}>
          <Stack
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {/* <NavSectionHorizontal
              data={navData}
              config={{
                currentRole: user?.role || "admin",
              }}
            /> */}
          </Stack>
        </Box>
      )}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        {/* {process.env.REACT_APP_ENVIRONMENT !== "production" && (
          <LanguagePopover />
        )} */}

        <NotificationsPopover />

        {/* <ContactsPopover /> */}

        {/* <SettingsButton /> */}

        {/* <Searchbar /> */}

        {/* {smUp && <DateTimeOverview />} */}

        {smUp && (
          <>
            <IconButton aria-label="help" color="primary">
              <HelpOutlineIcon />
            </IconButton>
            <IconButton aria-label="language" color="primary">
              <TranslateIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );
  // useSkipFirstRender(() => {
  //   if (notifications?.[notifications.length - 1]?.message) {
  //     toast.custom(
  //       <Box
  //         sx={{
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "space-between",
  //           bgcolor: "background.paper",
  //           color: "text.primary",
  //           p: 2,
  //           borderRadius: 2,
  //           boxShadow: 3,
  //           maxWidth: "350px",
  //           border: "1px solid",
  //           borderColor: "divider",
  //         }}
  //       >
  //         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
  //           <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
  //             {notifications?.[notifications.length - 1]?.message}
  //           </Typography>
  //         </Box>
  //         {/* <IconButton size="small" onClick={() => toast.dismiss(t.id)}>
  //         </IconButton> */}
  //       </Box>,
  //       {
  //         duration: 5000,
  //         position: "bottom-left",
  //       }
  //     );
  //   }
  // }, [notificationTrigger]);

  return (
    <Box dir={direction}>
      <AppBar
        // position="absolute"
        sx={{
          right: NAV.W_VERTICAL,
          height: HEADER.H_MOBILE,
          paddingBottom: 12,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(["height"], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
            height: HEADER.H_DESKTOP,
            ...(offsetTop && {
              height: HEADER.H_DESKTOP_OFFSET,
            }),
            ...((isNavVertical || isNavMini) && {
              borderBottom: `1px solid ${theme.palette.divider}`,
            }),
            ...(isNavHorizontal && {
              bgcolor: "common.white",
              height: HEADER.H_DESKTOP_OFFSET,
              borderBottom: `1px solid ${"#1D3E6E"}`,
            }),
            ...(isNavMini && {
              width: `calc(100% - ${NAV.W_MINI + 1}px)`,
            }),
          }),
        }}
      >
        {/* {tl?.translateValue("you_can_have_new_otp_in_seconds", {
        seconds: 500
      })} */}
        <AccessibilityToolbar />

        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
          }}
        >
          {renderContent}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
