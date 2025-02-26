import PropTypes from "prop-types";
import { useEffect } from "react";
// @mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
// hooks
// hooks
// components
//
import { NAV } from "../config-layout";
import { useNavData } from "./config-navigation";
import { NavToggleButton } from "../_common";
import { usePathname } from "../../routes/hooks";
import { useResponsive } from "../../hooks/use-responsive";
import { useMockedUser } from "../../hooks/use-mocked-user";
import Scrollbar from "../../components/scrollbar";
import Logo from "../../components/logo";
import NavSectionVertical from "../../components/nav-section/vertical/nav-section-vertical";
import i18n from "../../locales/i18n";

// ----------------------------------------------------------------------

export default function NavVertical({ openNav, onCloseNav }) {
  const { user } = useMockedUser();

  const pathname = usePathname();
  const direction = i18n.language === "ar" ? "ltr" : "ltr";
  const lgUp = useResponsive("up", "lg");
    const smUp = useResponsive("up", "sm");


  const navData = useNavData();
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);
  const renderContent = (
    <Box sx={{ direction }}>
      <Scrollbar
        data-tour-id="drawer_tour"
        sx={{
          height: 1,
          "& .simplebar-content": {
            height: 1,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Logo sx={{ padding: 3 }} />
        <NavSectionVertical
          data={navData}
          config={{
            currentRole: user?.role || "admin",
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

      </Scrollbar>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
        borderTopRightRadius: "24px",
        borderBottomRightRadius: "24px",
        backgroundColor: "background.paper",
        boxShadow: (theme) => theme.customShadows.z20,
        zIndex: 1001,
        direction,
      }}
    >
      {/* <NavToggleButton /> */}

      {lgUp ? (
        <Box sx={{ direction, height:"728px" }}>
          <Stack
            sx={{
              height: 1,
              position: "fixed",
              width: NAV.W_VERTICAL,
              borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {renderContent}
          </Stack>
        </Box>
      ) : (
        <Box sx={{ direction }}>
          <Drawer
            open={openNav}
            onClose={onCloseNav}
            PaperProps={{
              sx: {
                width: NAV.W_VERTICAL,
                // hideBackdrop: true
              },
            }}
          >
            {renderContent}
          </Drawer>
        </Box>
      )}
    </Box>
  );
}

NavVertical.propTypes = {
  onCloseNav: PropTypes.func,
  openNav: PropTypes.bool,
};
