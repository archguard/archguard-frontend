import React, { useState } from "react";
import { Tabs } from "antd";
import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { CouplingEvaluationIssuesConfigs } from "./CouplingEvaluationIssuesList.config";

const CouplingEvaluation = () => {
  const [hubModuleParameter, setHubModuleParameter] = useState<any>({ orderByFanIn: true });
  const [hubPackageParameter, setHubPackageParameter] = useState<any>({ orderByFanIn: true });
  const [hubClassParameter, setHubClassParameter] = useState<any>({ orderByFanIn: true });
  const [hubMethodParameter, setHubMethodParameter] = useState<any>({ orderByFanIn: true });

  return (
    <Tabs onChange={() => {}} type="card">
      <Tabs.TabPane tab="枢纽模块" key="hub_module">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.HUB_MODULE}
          parameter={hubModuleParameter}
          onSortChange={(sorter) => {
            setHubModuleParameter({ orderByFanIn: sorter.field === "fanIn" });
          }}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="枢纽包" key="hub_package">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.HUB_PACKAGE}
          parameter={hubPackageParameter}
          onSortChange={(sorter) => {
            setHubPackageParameter({ orderByFanIn: sorter.field === "fanIn" });
          }}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="枢纽类" key="hub_class">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.HUB_CLASS}
          parameter={hubClassParameter}
          onSortChange={(sorter) => {
            setHubClassParameter({ orderByFanIn: sorter.field === "fanIn" });
          }}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="枢纽方法" key="hub_method">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.HUB_METHOD}
          parameter={hubMethodParameter}
          onSortChange={(sorter) => {
            setHubMethodParameter({ orderByFanIn: sorter.field === "fanIn" });
          }}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="数据泥团" key="data-clumps">
        <IssuesList issuesConfig={CouplingEvaluationIssuesConfigs.DATA_CLUMPS} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过深继承" key="deep-inheritence">
        <IssuesList issuesConfig={CouplingEvaluationIssuesConfigs.DEEP_INHERITENCE} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="循环依赖" key="circular-dependency">
        <IssuesList issuesConfig={CouplingEvaluationIssuesConfigs.CIRCULAR_DEPENDENCY} />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default CouplingEvaluation;
