import PropTypes from "prop-types";
// @mui
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
//
import { HeaderSimple as Header } from "../_common";
import { useBoolean } from "../../hooks/use-boolean";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Main from "../dashboard/main";
import i18n from "../../locales/i18n";
import NavVertical from "../dashboard/nav-vertical";

// ----------------------------------------------------------------------

export default function CompactLayout({ children }) {
  const direction = i18n.language === "ar" ? "ltr" : "rtl";
  const nav = useBoolean();

  const renderNavVertical = (
    <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />
  );
  return (
    <>
      <Box sx={{ direction }}>
        <Header onOpenNav={nav.onTrue} />
        <Box
          sx={{
            minHeight: 1,
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

CompactLayout.propTypes = {
  children: PropTypes.node,
};
