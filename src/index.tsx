import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  MantineProvider,
  createTheme,
  defaultVariantColorsResolver,
  VariantColorsResolver,
  MantineThemeProvider,
} from "@mantine/core"; // Ensure Mantine is installed
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import reportWebVitals from "./reportWebVitals"; // Import reportWebVitals if needed

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  // Add new variants support
  if (input.variant === "black") {
    return {
      background: "var(--mantine-color-veryDarkGray-1)",
      hover: "var(--mantine-color-grey-7)",
      color: "var(--mantine-color-greenNeon-7)",
      border: "none",
    };
  }
  if (input.variant === "greenNeon") {
    return {
      background: "var(--mantine-color-greenNeon-7)",
      hover: "var(--mantine-color-greenNeon-8)",
      color: "var(--mantine-color-veryDarkGray-1)",
      border: "none",
      // border: `${rem(1)} solid var(--mantine-color-grey-7)`,
    };
  }
  if (input.variant === "red") {
    return {
      background: "var(--mantine-color-red-7)",
      hover: "var(--mantine-color-red-8)",
      color: "var(--mantine-color-white-1)",
      border: "none",
      // border: `${rem(1)} solid var(--mantine-color-grey-7)`,
    };
  }

  return defaultResolvedColors;
};

const theme = createTheme({
  fontFamily: "Poppins, sans-serif", // Add a fallback font
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
  },
  components: {
    Button: {
      defaultProps: {
        size: "md", // Ensure buttons aren't too large
      },
    },
    TextInput: {
      defaultProps: {
        size: "sm",
      },
    },
    Checkbox: {
      defaultProps: {
        size: "sm",
      },
    },
  },
  breakpoints: {
    xxs: "20em",
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  colors: {
    brown: [
      "#fdf6ea",
      "#f3e9dc",
      "#e5d1b8",
      "#d6b790",
      "#caa36d",
      "#c39557",
      "#c08d4b",
      "#a97a3c",
      "#976c33",
      "#845c27",
    ],
    blue: [
      "#eaebff",
      "#d0d2ff",
      "#9ca0ff",
      "#666cfd",
      "#0077B6",
      "#3940fc",
      "#1e24fc",
      "#0f16fd",
      "#010be2",
      "#0007cb",
      "#0003b3",
    ],
    white: [
      "#FFFFFF",
      "#F9FAFB",
      "#F3F4F6",
      "#E5E7EB",
      "#D1D5DB",
      "#9CA3AF",
      "#6B7280",
      "#4B5563",
      "#374151",
      "#1F2937",
      "#111827",
      "#0F172A",
    ],
    green: [
      "#ECFDF5",
      "#D1FAE5",
      "#A7F3D0",
      "#6EE7B7",
      "#34D399",
      "#10B981",
      "#059669",
      "#047857",
      "#065F46",
      "#064E3B",
      "#052C16",
      "#20845A",
    ],
    greenNeon: [
      "#faffe3",
      "#f5ffcd",
      "#ebff9c",
      "#e0ff66",
      "#BCEC00",
      "#d1ff21",
      "#cdff11",
      "#b5e300",
      "#9fc900",
      "#88ae00",
    ],
    grey: [
      "#F9FAFB",
      "#F3F4F6",
      "#E5E7EB",
      "#D1D5DB",
      "#9CA3AF",
      "#6B7280",
      "#4B5563",
      "#374151",
      "#1F2937",
      "#111827",
      "#0F172A",
    ],
    lightGreen: [
      "#fafaf0",
      "#f2f2e1",
      "#e4e3be",
      "#d6d597",
      "#c9c876",
      "#c1c062",
      "#bdbc56",
      "#a6a646",
      "#94943c",
      "#7f7f2e",
    ],
    lightGray: [
      "#fef2f5",
      "#eae6e7",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#676465",
      "#5e5457",
    ],
    veryDarkGray: [
      "#5A5A5A",
      "#131313",
      "#131313",
      "#131313",
      "#131313",
      "#131313",
      "#131313",
      "#131313",
      "#131313",
      "#131313",
    ],
    darkGreen: [
      "#f7ffeb",
      "#eefed5",
      "#dbfea3",
      "#c6fe6e",
      "#b5fe47",
      "#aafe32",
      "#a3fe28",
      "#8fe21e",
      "#7dc815",
      "#69ad00",
    ],
    brightRed: [
      "#ffe8e8",
      "#ffd1d1",
      "#f9a2a2",
      "#f46f6f",
      "#f04545",
      "#ed2a2a",
      "#ed191b",
      "#d3090f",
      "#bd000b",
      "#a50006",
    ],
    blueGray: [
      "#f3f3fe",
      "#e3e7ed",
      "#c8ccd2",
      "#abafb8",
      "#9197a1",
      "#818895",
      "#79808f",
      "#666e7d",
      "#5a6271",
      "#4a5466",
    ],
    yellow: [
      "#fafaf0",
      "#f2f2e1",
      "#e4e3be",
      "#d6d597",
      "#c9c876",
      "#c1c062",
      "#bdbc56",
      "#a6a646",
      "#94943c",
      "#7f7f2e",
      "#F6CC47",
    ],
    brightGreen: [
      "#f7ffeb",
      "#eefed5",
      "#dbfea3",
      "#c6fe6e",
      "#b5fe47",
      "#aafe32",
      "#a3fe28",
      "#8fe21e",
      "#7dc815",
      "#69ad00",
    ],
    deepOrange: [
      "#fff9e0",
      "#fff1ca",
      "#ffe299",
      "#ffd162",
      "#ffc336",
      "#ffbb18",
      "#ffb602",
      "#e4a000",
      "#ca8e00",
      "#af7900",
    ],
    red: [
      "#ffe8e8",
      "#ffd1d1",
      "#f9a2a2",
      "#f46f6f",
      "#f04545",
      "#ed2a2a",
      "#ed191b",
      "#d3090f",
      "#bd000b",
      "#a50006",
    ],
    deepBlue: [
      "#EBF8FF",
      "#D1EFFF",
      "#A3DFFF",
      "#5CC6FF",
      "#0077B6",
      "#006AA3",
      "#005D8F",
      "#00507A",
      "#003552",
      "#002B42",
    ],
    deepGray: [
      "#141414",
      "#2B2B2B",
      "#545454",
      "#808080",
      "#ABABAB",
      "#D5D5D5",
      "#DEDEDE",
      "#E6E6E6",
      "#EDEDED",
      "#F7F7F7",
      "#FAFAFA",
      "#F8F8FF",
      "#F7F7F77F",
    ],
  },
  variantColorResolver,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <MantineThemeProvider>
        <Notifications position="bottom-right" zIndex={1000} />
        <App />
      </MantineThemeProvider>
    </MantineProvider>
  </React.StrictMode>
);

// Optional: Report web vitals
reportWebVitals();
