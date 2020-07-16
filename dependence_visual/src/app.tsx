import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";

export function rootContainer(container: JSX.Element) {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>{container}</ConfigProvider>
    </Provider>
  );
}
