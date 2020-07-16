import React, { useState } from "react";
import { Tabs } from "antd";
import queryString from "query-string";
import SettingFilled from "@ant-design/icons/SettingFilled";

import "./index.css";

import MethodDependence from "./MethodDependence";
import ClassDependence from "./ClassDependence";
import PackageDependence from "./PackageDependence";
import ModuleDependence from "./ModuleDependence";
import DependenceConfig from "./DependenceConfig";
import DependenceScanner from "./DependenceScanner";

import { getFeature, FEATURES } from "@/config/buildTargets";

function Dependence(props) {
  const { location, match, history } = props;

  const query = queryString.parse(location.search);

  const [configVisible, setConfigVisible] = useState(false);

  return (
    <div>
      <Tabs
        activeKey={match.params.type}
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
          <ClassDependence query={query} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="method" key="method">
          <MethodDependence query={query} />
        </Tabs.TabPane>
      </Tabs>
      <DependenceConfig visible={configVisible} hide={() => setConfigVisible(false)} />
    </div>
  );
}

export default Dependence;
