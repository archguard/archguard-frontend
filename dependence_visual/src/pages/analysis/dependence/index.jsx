import React from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import queryString from "query-string";
import SettingFilled from "@ant-design/icons/SettingFilled";

import "./index.css";

import MethodDependence from "./MethodDependence";
import ClassDependence from "./ClassDependence";
import PackageDependence from "./PackageDependence";
import ModuleDependence from "./ModuleDependence";
import DependenceConfig from "./DependenceConfig";
import DependenceScanner from "./DependenceScanner";

import { queryConfig } from "@/api/dependence/dependenceConfig";

import { resetConfig } from "./actions/config";
import { showConfig } from "./actions/configVisible";
import { getFeature, FEATURES } from "@/config/buildTargets";

class Dependence extends React.Component {
  componentDidMount() {
    queryConfig().then((res) => {
      this.props.resetConfig(res);
    });
  }

  render() {
    const query = queryString.parse(this.props.location.search);
    return (
      <div>
        <Tabs
          activeKey={this.props.match.params.type}
          tabBarExtraContent={
            <div className="dependence-extra-content">
              {getFeature(FEATURES.CODE_SCANNER) && <DependenceScanner />}
              <SettingFilled onClick={() => this.props.showConfig()} />
            </div>
          }
          onChange={(activeKey) => this.props.history.replace("/dependence/" + activeKey)}
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
        <DependenceConfig />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  resetConfig,
  showConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dependence);
