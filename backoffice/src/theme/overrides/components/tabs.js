import { tabClasses } from "@mui/material/Tab";

// ----------------------------------------------------------------------

export function tabs(theme) {
  return {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#1D3E6E",
        },
        scrollButtons: {
          width: 48,
          borderRadius: "50%",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          opacity: 1,
          minWidth: 48,
          minHeight: 48,
          fontWeight: theme.typography.fontWeightSemiBold,
          "&:not(:last-of-type)": {
            marginRight: theme.spacing(3),
            [theme.breakpoints.up("sm")]: {
              marginRight: theme.spacing(5),
            },
          },
          [`&:not(.${tabClasses.selected})`]: {
            color: "#1D3E6E",
          },
        },
      },
    },
  };
}
