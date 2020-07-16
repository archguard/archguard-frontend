import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import React from "react";

export function rootContainer(container: JSX.Element) {
  return (
      <ConfigProvider locale={zhCN}>{container}</ConfigProvider>
  );
}
