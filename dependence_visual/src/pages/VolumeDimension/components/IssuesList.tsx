import React, { useState } from "react";
import { columns } from "./columns.config";
import "./IssuesList.less";
import { PagerTable } from "@/components/PagerTable/PagerTable";
import { baseURL } from "@/api/module/config";

interface IssuesListProps {
  issuesAndSuggestion: {
    title: string;
    badSmellDescription: string;
    suggestion: string;
  };
}

const IssuesList = (props: IssuesListProps) => {
  const { title, badSmellDescription, suggestion } = props.issuesAndSuggestion;
  const [count, setCount] = useState(0);

  return (
    <div className="issues-list">
      <div className="issues-list-header x-between">
        <span className="issues-list-title">{title}</span>
        <span className={`issues-list-count ${count ? "red" : "green"}`}>{count}</span>
      </div>
      <div className="issues-list-content">
        <div className="issues-desc">
          <span>坏味道描述：</span>
          <span>{badSmellDescription}</span>
        </div>
        <div className="issues-suggest">
          <span>改进建议：</span>
          <span>{suggestion}</span>
        </div>
        <PagerTable
          change={(count) => {
            setCount(count);
          }}
          columns={columns}
          url={baseURL + "/codeline/methods/above-threshold"}
        />
      </div>
    </div>
  );
};

export default IssuesList;
