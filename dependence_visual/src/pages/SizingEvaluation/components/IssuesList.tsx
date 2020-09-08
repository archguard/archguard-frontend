import React, { useState, useEffect } from "react";
import { BuPagerTable } from "@/components/Business/PagerTable/PagerTable";
import { IssuesConfig } from "./IssuesConfig.config";
import "./IssuesList.less";

interface IssuesListProps {
  issuesConfig: IssuesConfig;
}

const IssuesList = (props: IssuesListProps) => {
  const { title, badSmellDescription, suggestion, tableConfigs } = props.issuesConfig;
  const [count, setCount] = useState(0);
  const [tableCounts, setTableCounts] = useState(tableConfigs.map(() => 0));

  useEffect(() => {
    setCount(tableCounts.reduce((sum, current) => sum + current));
  }, [tableCounts]);

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
        {tableConfigs.map((tableConfig, index) => (
          <div key={index} className="issues-table">
            <div className="issues-table-title">{tableConfig.title}</div>
            <BuPagerTable
              change={(count) => {
                tableCounts[index] = count;
                setTableCounts([...tableCounts]);
              }}
              columns={tableConfig.columns}
              url={tableConfig.dataUrl}
              parameter={tableConfig.parameter}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesList;
