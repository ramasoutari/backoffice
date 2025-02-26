import PropTypes from "prop-types";
// @mui
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Box, Button } from "@mui/material";
// theme
// hooks
// components
import { AccessibilityToolbar } from "../../components/accessibility";
//
import { HEADER, NAV } from "../config-layout";
import { AccountPopover, DateTimeOverview } from "../_common";
import { useEffect } from "react";
import { useNavData } from "../dashboard/config-navigation";
import { useAuthContext } from "../../auth/hooks";
import { RouterLink } from "../../routes/components";
import { useResponsive } from "../../hooks/use-responsive";
import Logo from "../../components/logo";
import { useSettingsContext } from "../../components/settings/context";
import { bgBlur } from "../../theme/css";
import { useOffSetTop } from "../../hooks/use-off-set-top";
import NavSectionHorizontal from "../../components/nav-section/horizontal/nav-section-horizontal";
import { useLocales } from "../../locales";
import SvgColor from "../../components/svg-color";
// ----------------------------------------------------------------------

export default function HeaderSimple({ onOpenNav }) {
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

  const offsetTop = offset && !isNavHorizontal;
  const { t, currentLang } = useLocales();

  const renderContent = (
    <>
      <Stack flexGrow={1} direction="row" alignItems="center">
        {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5, height: 60 }} />}
        {!lgUp && (
          <IconButton onClick={onOpenNav}>
            <SvgColor src="/icons/ic_menu_item.svg" />
          </IconButton>
        )}

        {user && <AccountPopover />}
      </Stack>
      {smUp && (
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
      )}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1, lg: 6 }}
      >
        {/* <LanguagePopover /> */}

        {/* <NotificationsPopover /> */}

        {/* <ContactsPopover /> */}

        {/* <SettingsButton /> */}

        {/* <Searchbar /> */}

        {smUp && <DateTimeOverview />}
      </Stack>
    </>
  );

  return (
    <AppBar
      // position="absolute"
      sx={{
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
            width: 1,
            bgcolor: "common.white",
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `1px solid ${"#ED8539"}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
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
  );
}

HeaderSimple.propTypes = {
  onOpenNav: PropTypes.func,
};
