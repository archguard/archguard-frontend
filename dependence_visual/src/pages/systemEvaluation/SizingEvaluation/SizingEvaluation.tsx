import React from "react";
import { Tabs } from "antd";
import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { SizingEvaluationIssuesConfigs } from "./SizingEvaluationIssuesList.config";
import { connect, useStore } from "@/store/store";

const SizingEvaluation = () => {
  const { state } = useStore();

  const {
    oversizedMethodByLine,
    oversizedClassByLine,
    oversizedClassByCount,
    oversizedPackageByLine,
    oversizedPackageByCount,
    oversizedModuleByLine,
    oversizedModuleByCount,
  } = state;

  return (
    <Tabs onChange={() => {}} type="card">
      <Tabs.TabPane tab="过大的方法" key="method">
        <IssuesList
          issuesConfig={SizingEvaluationIssuesConfigs.METHOD}
          thresholds={[oversizedMethodByLine]}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过大的类" key="class">
        <IssuesList
          issuesConfig={SizingEvaluationIssuesConfigs.CLASS}
          thresholds={[oversizedClassByLine, oversizedClassByCount]}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过大的包" key="package">
        <IssuesList
          issuesConfig={SizingEvaluationIssuesConfigs.PACKAGE}
          thresholds={[oversizedPackageByLine, oversizedPackageByCount]}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过大的模块" key="module">
        <IssuesList
          issuesConfig={SizingEvaluationIssuesConfigs.MODULE}
          thresholds={[oversizedModuleByLine, oversizedModuleByCount]}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default connect(SizingEvaluation);
