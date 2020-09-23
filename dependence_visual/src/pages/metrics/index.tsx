import React from "react";
import { Tabs } from "antd";
import Dfms from "./dfms";
import ModuleCouplingTree from "./ModuleCouplingTree";

const Metrics = () => {
  return (
    <div>
      <Tabs defaultActiveKey="coupling">
        <Tabs.TabPane tab="模块耦合度分析" key="coupling">
          <ModuleCouplingTree />
        </Tabs.TabPane>
        <Tabs.TabPane tab="DFMS" key="dfms">
          <Dfms />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Metrics;
