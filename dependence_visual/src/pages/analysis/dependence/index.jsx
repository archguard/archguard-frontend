import { FEATURES, getFeature } from "@/config/buildTargets";
import SettingFilled from "@ant-design/icons/SettingFilled";
import { Tabs } from "antd";
import React, { useState } from "react";
import { useHistory, useParams } from "umi";
import ClassDependence from "./ClassDependence";
import DependenceConfig from "./DependenceConfig";
import DependenceScanner from "./DependenceScanner";
import "./index.css";
import MethodDependence from "./MethodDependence";
import ModuleDependence from "./ModuleDependence";
import PackageDependence from "./PackageDependence";

export default function Dependence() {
  const history = useHistory();
  const { type } = useParams();

  const [configVisible, setConfigVisible] = useState(false);

  return (
    <div>
      <Tabs
        activeKey={type}
        tabBarExtraContent={
          <div className="dependence-extra-content">
            {getFeature(FEATURES.CODE_SCANNER) && <DependenceScanner />}
            <SettingFilled onClick={() => setConfigVisible(true)} />
          </div>
        }
        onChange={(activeKey) => history.replace("/analysis/dependence/" + activeKey)}
      >
        <Tabs.TabPane tab="module" key="module">
          <ModuleDependence />
        </Tabs.TabPane>
        <Tabs.TabPane tab="package" key="package">
          <PackageDependence />
        </Tabs.TabPane>
        <Tabs.TabPane tab="class" key="class">
          <ClassDependence />
        </Tabs.TabPane>
        <Tabs.TabPane tab="method" key="method">
          <MethodDependence />
        </Tabs.TabPane>
      </Tabs>
      <DependenceConfig visible={configVisible} hide={() => setConfigVisible(false)} />
    </div>
  );
}