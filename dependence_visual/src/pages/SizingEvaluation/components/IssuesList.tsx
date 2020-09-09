import React, { useState, useEffect } from "react";
import { BuPagerTable } from "@/components/Business/PagerTable/PagerTable";
import { IssuesConfig } from "./IssuesConfig.config";
import "./IssuesList.less";
import { BaLabelDescription } from '@/components/Basic/LabelDescription/LabelDescription';

interface IssuesListProps {
  issuesConfig: IssuesConfig;
}

const IssuesList = (props: IssuesListProps) => {
  const { title, badSmellDescription, suggestion, tableConfigs } = props.issuesConfig;
  const [count, setCount] = useState(0);
  const [tableCounts, setTableCounts] = useState(tableConfigs.map(() => 0));

  const getColor = (count: number) => {
    return count === 0 ? 'green' : 'red'
  }

  useEffect(() => {
    setCount(tableCounts.reduce((sum, current) => sum + current));
  }, [tableCounts]);

  return (
    <div className="issues-list">
      <div className="issues-list-header x-between">
        <span className="issues-list-title">{title}</span>
        <span className={`issues-list-count ${getColor(count)}`}>{count}</span>
      </div>
      <div className="issues-list-content">
        <BaLabelDescription
          label="坏味道描述"
          description={badSmellDescription} />
        <BaLabelDescription
          label="改进建议"
          description={suggestion} />
        {tableConfigs.map((tableConfig, index) => (
          <div key={index} className="issues-table">
            <div className="issues-table-title">
              <strong>{tableConfig.title}</strong>
              { tableCounts.length > 1 ?
                <span className={getColor(tableCounts[index])}>{tableCounts[index]}</span>
              : null }
            </div>
            <BuPagerTable
              countChange={(count) => {
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
