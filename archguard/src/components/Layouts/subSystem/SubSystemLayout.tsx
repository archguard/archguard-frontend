import React from "react";
import { Layout } from "antd";
import { history, Outlet } from 'umi';

import SubSystemHeader from "./SubSystemHeader";
import SubSystemSider from "./SubSystemSider";
import SubSystemFooter from "./SubSystemFooter";

import "antd/dist/antd.less";

const { Header, Sider, Content, Footer } = Layout;

export default function SubSystemLayout() {
  const { location } = window;

  return (
    <Layout style={{ height: "100%" }}>
      <Header style={{ padding: 0, backgroundColor: "#3AAFAE" }}>
        <SubSystemHeader history={history} />
      </Header>

      <Layout>
        <Sider collapsible style={{ backgroundColor: "#f6f6f6" }}>
          <SubSystemSider history={history} location={location} />
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
            <Outlet />
          </Content>

          <Footer style={{ height: "28px" }}>
            <SubSystemFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
