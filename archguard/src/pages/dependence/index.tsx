import SettingFilled from "@ant-design/icons/SettingFilled";
import { Tabs } from "antd";
import React, { useState } from "react";
import { useHistory, useParams } from "umi";
import ClassDependence from "./ClassDependence";
import DependenceConfig from "./DependenceConfig";
import "./index.css";
import MethodDependence from "./MethodDependence";
import ModuleDependence from "./ModuleDependence";
import PackageDependence from "./PackageDependence";
import { storage } from "@/store/storage/sessionStorage";
import useUrlQuery from "@/hooks/useUrlQuery";

interface DependenceProp {
  withRouter: boolean,
  systemId: number,
}

export default function Dependence(props: DependenceProp) {
  const history = useHistory();
  const { tab } = useUrlQuery<{ tab: "class" | "method" | "package" | "module" }>();
  const { systemId } = useParams();
  const [currentId ] = useState(props.systemId || systemId)

  storage.setSystemId(currentId)
  const language = storage.getSystemLanguage();

  const [configVisible, setConfigVisible] = useState(false);

  function onChangeTab(activeKey: string) {
    if (!props.withRouter) {
      return
    }

    return history.replace(`/${ currentId }/analysis/dependence?tab=${ activeKey }`);
  }

  return (
    <div>
      <Tabs activeKey={ tab } tabBarExtraContent={
        <div className="dependence-extra-content">
          <SettingFilled onClick={ () => setConfigVisible(true) }/>
        </div>
      }
            onChange={ (activeKey) => onChangeTab(activeKey) }>
        <Tabs.TabPane tab="module" key="module">
          <ModuleDependence systemId={ currentId }/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="package" key="package">
          <PackageDependence language={ language } systemId={ currentId }/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="class" key="class">
          <ClassDependence systemId={ currentId }/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="method" key="method">
          <MethodDependence systemId={ currentId }/>
        </Tabs.TabPane>
      </Tabs>
      <DependenceConfig visible={ configVisible } hide={ () => setConfigVisible(false) }/>
    </div>
  );
}
