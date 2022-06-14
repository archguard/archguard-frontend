import React from "react";
import { Layout } from "antd";
import MainHeader from "@/components/Business/Layouts/main/MainHeader";
import "./MainLayout.less"

const { Content } = Layout;

export default function MainLayout(props: any) {
  return (
    <Layout className="multiple-system-container" >
      <MainHeader history={props.history} location={props.location}/>

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
