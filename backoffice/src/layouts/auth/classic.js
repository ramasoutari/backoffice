import PropTypes from "prop-types";
// @mui
import { Box, Stack, Container, Typography } from "@mui/material";
import Logo from "../../components/logo";
import { LoadingScreen } from "../../components/loading-screen";
import { useLocales } from "../../locales";

// ----------------------------------------------------------------------

export default function AuthClassicLayout({ children }) {
  const { t } = useLocales();

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 1, textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo
          sx={{
            width: "160px",
          }}
        />
      </Box>
      {/* Arabic Title Below Logo */}
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", color: "text.primary", pt: 3 }}
      >
        شاشة الدخول الى النظام
      </Typography>
      <Typography variant="hH6" sx={{ color: "text.primary", pb: 3 }}>
        {" "}
        نظام الموافقة على تركيب المضخات والتزود بالوقود في محطة محروقات 
      </Typography>
    </Stack>
  );

  const renderContent = <Box sx={{ pt: 3 }}>{children}</Box>;

  if (!t) {
    return <LoadingScreen />;
  }

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Right Side - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "850",
          height: "1024",
          backgroundColor: "common.white",
          borderTopLeftRadius: "37px",
          borderBottomLeftRadius: "37px",
          zIndex: 55,
          ml: "-40px",
          boxShadow: "-1px 10px 60px rgba(5, 5, 5, 0.1)",
        }}
      >
        <Container maxWidth="lg">
          {/* Form Container */}
          <Box
            sx={{
              width:"700px",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "common.white",
                mwidth: { xs: "100%", sm: "600px", md: "800px" }, // Increased width
              }}
            >
              {renderHead}
              {renderContent}
            </Box>
          </Box>
        </Container>
      </Box>
      
      {/* Left Side - Image Section */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "common.white",
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            width: "343px",
            height: "344px",
            top: "250px",
            left: "300px",
            backgroundImage: `url(/icons/login-image.png)`,
            backgroundPosition: "center",
          }}
        />
      </Box>
    </Box>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
};
