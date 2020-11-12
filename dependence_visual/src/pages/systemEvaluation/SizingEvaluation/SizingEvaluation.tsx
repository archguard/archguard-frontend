import React, { useState } from "react";
import { Tabs } from "antd";
import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { SizingEvaluationIssuesConfigs } from "./SizingEvaluationIssuesList.config";
import SearchForm, { SearchFields } from '../components/SearchForm';

const SizingEvaluation = () => {
  const [parameter, setParameter] = useState({});
  const [currentSearchFields, setCurrentSearchFields] = useState<SearchFields>();

  const updateParameter = (searchFields: SearchFields) => {
    setParameter(searchFields);
  }

  return (
    <div>
      <SearchForm data={currentSearchFields} onSubmit={updateParameter}></SearchForm>
      <Tabs onChange={() => { }} type="card">
        <Tabs.TabPane tab="过大的方法" key="method">
          <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.METHOD} parameter={parameter} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="过大的类" key="class">
          <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.CLASS} parameter={parameter} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="过大的包" key="package">
          <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.PACKAGE} parameter={parameter} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="过大的模块" key="module">
          <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.MODULE} parameter={parameter} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default SizingEvaluation;
