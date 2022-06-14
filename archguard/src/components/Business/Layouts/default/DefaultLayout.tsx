import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.less";
import DefaultHeader from "@/components/Business/Layouts/default/DefaultHeader";
import "./DefaultLayout.less"

const { Header, Content } = Layout;

export default function DefaultLayout(props: any) {
  return (
    <Layout className="multiple-system-container">
      <DefaultHeader />

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
