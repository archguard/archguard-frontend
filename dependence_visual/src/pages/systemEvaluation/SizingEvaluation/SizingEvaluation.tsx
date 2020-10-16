import React from "react";
import { Tabs } from "antd";
import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { SizingEvaluationIssuesConfigs } from "./SizingEvaluationIssuesList.config";

const SizingEvaluation = () => {
  return (
    <Tabs onChange={() => {}} type="card">
      <Tabs.TabPane tab="过大的方法" key="method">
        <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.METHOD} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过大的类" key="class">
        <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.CLASS} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过大的包" key="package">
        <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.PACKAGE} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过大的模块" key="module">
        <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.MODULE} />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default SizingEvaluation;
