"use client";
import { ConfigProvider } from "antd";
import React from "react";
import { themeConfig } from "@theme/pallete";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};
