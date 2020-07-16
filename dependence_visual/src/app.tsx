import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

export function rootContainer(container) {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>{container}</ConfigProvider>
    </Provider>
  );
}
