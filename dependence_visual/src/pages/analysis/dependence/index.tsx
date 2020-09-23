import SettingFilled from "@ant-design/icons/SettingFilled";
import { Tabs } from "antd";
import React, { useState } from "react";
import ClassDependence from "./ClassDependence";
import DependenceConfig from "./DependenceConfig";
import "./index.css";
import MethodDependence from "./MethodDependence";
import ModuleDependence from "./ModuleDependence";
import PackageDependence from "./PackageDependence";

export default function Dependence() {
  const [configVisible, setConfigVisible] = useState(false);

  return (
    <div>
      <Tabs
        defaultActiveKey="module"
        tabBarExtraContent={
          <div className="dependence-extra-content">
            <SettingFilled onClick={() => setConfigVisible(true)} />
          </div>
        }
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
