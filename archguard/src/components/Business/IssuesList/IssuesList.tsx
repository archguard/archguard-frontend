import "./IssuesList.less";
import React, { useState, useEffect } from "react";
import { BuPagerTable, PagerTableData } from "@/components/Business/PagerTable/PagerTable";
import { BaLabelDescription } from "@/components/Basic/LabelDescription/LabelDescription";
import { ExpandableConfig } from "antd/es/table/interface";

export interface IssuesTableConfig {
  title: (threshold?: string | number) => string;
  dataUrl: string;
  parameter?: any;
  columns: Array<{
    title: string;
    dataIndex: string;
    key: string;
    render?: (text: any, record?: any) => JSX.Element | string;
  }>;
  expandable?: ExpandableConfig<any>;
}

export interface IssuesConfig {
  title: string;
  badSmellDescription: string;
  suggestion: string;
  tableConfigs: IssuesTableConfig[];
}

interface IssuesListProps {
  issuesConfig: IssuesConfig;
  parameter?: any;
  onSortChange?(sorter: any): void;
}

const IssuesList = (props: IssuesListProps) => {
  const { onSortChange } = props;
  const { title, badSmellDescription, suggestion, tableConfigs } = props.issuesConfig;
  const [count, setCount] = useState(0);
  const [tableCounts, setTableCounts] = useState(tableConfigs.map(() => 0));
  const [parameter, setParameter] = useState(props.parameter);
  const [thresholds, setThresholds] = useState<number[]>([]);

  const getColor = (count: number) => {
    return count === 0 ? "green" : "red";
  };

  useEffect(() => {
    setParameter(props.parameter);
  }, [props.parameter]);

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
        <BaLabelDescription label="坏味道描述" description={badSmellDescription} />
        <BaLabelDescription label="改进建议" description={suggestion} />
        {tableConfigs.map((tableConfig, index) => (
          <div key={index} className="issues-table">
            <div className="issues-table-title">
              <strong>
                {tableConfig.title(thresholds.length ? thresholds[index] : undefined)}
              </strong>
              {tableCounts.length > 1 ? (
                <span className={getColor(tableCounts[index])}>{tableCounts[index]}</span>
              ) : null}
            </div>
            <BuPagerTable
              onDataChange={(data: PagerTableData) => {
                thresholds[index] = data.threshold;
                tableCounts[index] = data.count;
                setTableCounts([...tableCounts]);
                setThresholds([...thresholds]);
              }}
              onSortChange={onSortChange}
              columns={tableConfig.columns}
              url={tableConfig.dataUrl}
              parameter={parameter}
              expandable={tableConfig.expandable}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesList;
