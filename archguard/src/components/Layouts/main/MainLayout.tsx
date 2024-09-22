import React from "react";
import { Layout } from "antd";
import MainHeader from "@/components/Layouts/main/MainHeader";
import "./MainLayout.less"
import { useLocation, history } from "umi";

const { Content } = Layout;

export default function MainLayout(props: any) {
  const location = useLocation();

  return (
    <Layout className="multiple-system-container" >
      <MainHeader history={history} location={location}/>

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
