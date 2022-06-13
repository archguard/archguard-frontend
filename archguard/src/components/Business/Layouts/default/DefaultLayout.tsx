import React, { useState } from "react";
import { Layout } from "antd";
import "antd/dist/antd.less";
import { setLocale, useIntl } from "@@/plugin-locale/localeExports";
import "./DefaultLayout.less";

const { Header, Content } = Layout;

export default function DefaultLayout(props: any) {
  const { formatMessage } = useIntl();
  const [currentLanguage, setCurrentLanguage] = useState('zh-CN');
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  const setLanguage = () => {
    if (currentLanguage === "zh-CN") {
      setCurrentLanguage("en-US")
    } else {
      setCurrentLanguage("zh-CN")
    }

    setLocale(currentLanguage, false);
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Layout>
        <Layout style={{ overflow: "auto" }}>
          <Content style={{ padding: "32px", minHeight: "auto", backgroundColor: "#fff" }}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
