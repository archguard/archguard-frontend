import React from "react";
import { Layout } from "antd";
import JuneHeader from "@/components/Business/Layouts/june/JuneHeader";
import "./JuneLayout.less"
import PageSider from "@/components/Business/Layouts/PageSider";

const { Header, Sider, Content } = Layout;

export default function JuneLayout(props: any) {
  return (
    <Layout className="multiple-system-container">
      <JuneHeader history={props.history}/>

      <Layout style={{ backgroundColor: "transparent", overflow: "auto", background: "none" }}>
        <Layout style={{ overflow: "auto", backgroundColor: "transparent", background: "none" }}>
          <Content style={{ marginTop: "60px", padding: "32px", minHeight: "auto", backgroundColor: "transparent" }}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
