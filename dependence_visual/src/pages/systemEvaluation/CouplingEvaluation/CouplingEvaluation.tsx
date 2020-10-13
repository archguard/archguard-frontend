import React, { useState } from "react";
import { Tabs } from "antd";
import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { CouplingEvaluationIssuesConfigs } from "./CouplingEvaluationIssuesList.config";
import { connect, useStore } from "@/store/store";

const CouplingEvaluation = () => {
  const { state } = useStore();
  const [hubModuleParameter, setHubModuleParameter] = useState<any>({ orderByFanIn: true });
  const [hubPackageParameter, setHubPackageParameter] = useState<any>({ orderByFanIn: true });
  const [hubClassParameter, setHubClassParameter] = useState<any>({ orderByFanIn: true });
  const [hubMethodParameter, setHubMethodParameter] = useState<any>({ orderByFanIn: true });
  const {
    moduleDependencies,
    packageDependencies,
    classDependencies,
    methodDependencies,
    lackOfLCOM4,
    inheritanceDepth,
  } = state;

  return (
    <Tabs onChange={() => {}} type="card">
      <Tabs.TabPane tab="枢纽模块" key="hub_module">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.HUB_MODULE}
          thresholds={[moduleDependencies]}
          parameter={hubModuleParameter}
          onSortChange={(sorter) => {
            setHubModuleParameter({ orderByFanIn: sorter.field === "fanIn" });
          }}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="枢纽包" key="hub_package">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.HUB_PACKAGE}
          thresholds={[packageDependencies]}
          parameter={hubPackageParameter}
          onSortChange={(sorter) => {
            setHubPackageParameter({ orderByFanIn: sorter.field === "fanIn" });
          }}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="枢纽类" key="hub_class">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.HUB_CLASS}
          thresholds={[classDependencies]}
          parameter={hubClassParameter}
          onSortChange={(sorter) => {
            setHubClassParameter({ orderByFanIn: sorter.field === "fanIn" });
          }}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="枢纽方法" key="hub_method">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.HUB_METHOD}
          thresholds={[methodDependencies]}
          parameter={hubMethodParameter}
          onSortChange={(sorter) => {
            setHubMethodParameter({ orderByFanIn: sorter.field === "fanIn" });
          }}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="数据泥团" key="data-clumps">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.DATA_CLUMPS}
          thresholds={[lackOfLCOM4]}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过深继承" key="deep-inheritence">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.DEEP_INHERITENCE}
          thresholds={[inheritanceDepth]}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="循环依赖" key="circular-dependency">
        <IssuesList issuesConfig={CouplingEvaluationIssuesConfigs.CIRCULAR_DEPENDENCY} />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default connect(CouplingEvaluation);
