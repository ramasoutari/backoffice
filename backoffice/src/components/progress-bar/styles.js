// @mui
import { useTheme } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

// ----------------------------------------------------------------------

export default function StyledProgressBar() {
  const theme = useTheme();

  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        "#nprogress": {
          pointerEvents: "none",
          ".bar": {
            top: 0,
            left: 0,
            height: 2.5,
            zIndex: 9999,
            width: "100%",
            position: "fixed",
            backgroundColor: "#1D3E6E",
            boxShadow: `0 0 2px ${"#1D3E6E"}`,
          },
          ".peg": {
            right: 0,
            opacity: 1,
            width: 100,
            height: "100%",
            display: "block",
            position: "absolute",
            transform: "rotate(3deg) translate(0px, -4px)",
            boxShadow: `0 0 10px ${"#1D3E6E"}, 0 0 5px ${"#1D3E6E"}`,
          },
        },
      }}
    />
  );

  return inputGlobalStyles;
}
