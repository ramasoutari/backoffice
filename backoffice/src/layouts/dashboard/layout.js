import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";
// hooks
// components
//
import Main from "./main";
import Header from "./header";
import NavMini from "./nav-mini";
import NavVertical from "./nav-vertical";
import { useSettingsContext } from "../../components/settings/context";
import { useResponsive } from "../../hooks/use-responsive";
import { useBoolean } from "../../hooks/use-boolean";
import i18n from "../../locales/i18n";

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const settings = useSettingsContext();

  const lgUp = useResponsive("up", "lg");
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === "horizontal";

  const isMini = settings.themeLayout === "mini";

  const renderNavMini = <NavMini />;

  // const renderHorizontal = <NavHorizontal />;

  const renderNavVertical = (
    <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />
  );





 return (
   <>
     <Box sx={{ direction }}>
       <Header onOpenNav={nav.onTrue} />
       <Box
         sx={{
           display: "flex",
           direction,
           // flexDirection: { xs: "column", md: "row" },
         }}
       >
         {renderNavVertical}

         <Main>{children}</Main>
       </Box>
     </Box>
   </>
 );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
