import React from "react";
import { Tabs } from "antd";
import { history, useParams } from "umi";
import Dfms from "./Dfms";
import ModuleCouplingTree from "./ModuleCouplingTree";

const Metrics = () => {
  const { systemId, type } = useParams();

  return (
    <div>
      <Tabs
        activeKey={type}
        onChange={(activeKey) => history.replace(`/${systemId}/analysis/metric/${activeKey}`)}
      >
        <Tabs.TabPane tab="模块耦合度分析" key="coupling">
          <ModuleCouplingTree systemId={parseInt(systemId)}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="DFMS（离主序列线的距离）" key="dfms">
          <Dfms />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Metrics;
