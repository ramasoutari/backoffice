import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui

import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Tooltip,
  Typography,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
} from "@mui/material";
// routes
// config
// hooks
// auth
// components
import JwtIndividualLoginView from "./jwt-individual-login-view";

import { useLocales } from "../../locales";
import i18n from "../../locales/i18n";

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { t } = useLocales();

  const direction = i18n.language === "ar" ? "ltr" : "trl";
  useEffect(() => {
    console.log("direction", direction);
  }, [direction]);

  return (
    <Box sx={{ direction }}>
      <JwtIndividualLoginView />
    </Box>
  );
}
