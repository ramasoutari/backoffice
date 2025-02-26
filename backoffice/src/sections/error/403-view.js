
// ----------------------------------------------------------------------

import { Box, Typography } from "@mui/material";
import MotionContainer from "../../animate/motion-container";
import { varBounce } from "../../animate/variants";
import { useLocales } from "../../locales";
import { m } from "framer-motion";

export default function View403() {
  const { t } = useLocales();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        textAlign: "center",
        px: 2,
      }}
    >
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {t("no_permissions_view_screen")}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography variant="h1" sx={{ color: "text.secondary", mt: 5 }}>
            403
          </Typography>
          {/* <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} /> */}
        </m.div>
      </MotionContainer>
    </Box>
  );
}
