import React from "react";
import { Layout } from "antd";
import JuneHeader from "@/components/Business/Layouts/june/JuneHeader";
import "./JuneLayout.less"
import PageSider from "@/components/Business/Layouts/PageSider";

const { Header, Sider, Content } = Layout;

export default function JuneLayout(props: any) {
  return (
    <Layout className="multiple-system-container">
      <JuneHeader />

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
