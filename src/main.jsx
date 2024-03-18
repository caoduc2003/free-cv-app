import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/nprogress/styles.css";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider defaultColorScheme="light">
    <NavigationProgress />
    <App />
  </MantineProvider>
);
