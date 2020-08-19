import React from "react";
import { Layout } from "antd";
import PageHeader from "./header";
import PageSider from "./sider";
import PageFooter from "./footer";

import "antd/dist/antd.css";

const { Header, Sider, Content, Footer } = Layout;

export default function PageLayout(props) {
  return (
    <Layout style={{ height: "100%" }}>
      <Header style={{ padding: 0, backgroundColor: "primary" }}>
        <PageHeader history={props.history} />
      </Header>

      <Layout>
        <Sider collapsible style={{backgroundColor:"#f6f6f6"}}>
          <PageSider history={props.history} location={props.location} />
        </Sider>

        <Layout
          style={{
            overflow: "auto",
          }}
        >
          <Content
            style={{
              padding: "32px",
              minHeight: "auto",
              backgroundColor: "#fff",
            }}
          >
            {props.children}
          </Content>

          <Footer style={{height: "28px" }}>
            <PageFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
