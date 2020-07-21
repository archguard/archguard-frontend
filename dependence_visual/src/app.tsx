import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import React from "react";
import Loading from "./components/Loading";

export function rootContainer(container: JSX.Element) {
  return (
    <ConfigProvider locale={zhCN}>
      <Loading />
      {container}
    </ConfigProvider>
  );
}
