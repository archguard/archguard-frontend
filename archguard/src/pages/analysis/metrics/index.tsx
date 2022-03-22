import React from "react";
import { Tabs } from "antd";
import { useHistory, useParams } from "umi";
import { storage } from "@/store/storage/sessionStorage";
import Dfms from "./Dfms";
import ModuleCouplingTree from "./ModuleCouplingTree";

const Metrics = () => {
  const history = useHistory();
  const { type } = useParams();
  const systemId = storage.getSystemId();

  return (
    <div>
      <Tabs
        activeKey={type}
        onChange={(activeKey) => history.replace(`/${systemId}/analysis/metric/${activeKey}`)}
      >
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
