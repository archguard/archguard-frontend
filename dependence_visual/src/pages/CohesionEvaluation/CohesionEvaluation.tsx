import React from "react";
import { Tabs } from "antd";
import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { CohesionEvaluationIssuesConfigs } from "./CohesionEvaluationIssuesList.config";

const CohesionEvaluation = () => {
  return (
    <Tabs onChange={() => {}} type="card">
      <Tabs.TabPane tab="散弹式修改" key="shotgun-surgery">
        <IssuesList issuesConfig={CohesionEvaluationIssuesConfigs.SHOTGUN_SURGERY} />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default CohesionEvaluation;
