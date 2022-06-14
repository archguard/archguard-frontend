import React from "react";
import { Layout } from "antd";
import DefaultHeader from "@/components/Business/Layouts/default/DefaultHeader";
import "./DefaultLayout.less"

const { Header, Content } = Layout;

export default function DefaultLayout(props: any) {
  return (
    <Layout className="multiple-system-container">
      <DefaultHeader />

      <Layout style={{ backgroundColor: "transparent" }}>
        <Layout style={{ overflow: "auto", backgroundColor: "transparent" }}>
          <Content style={{ padding: "32px", minHeight: "auto", backgroundColor: "transparent" }}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
