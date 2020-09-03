import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { columns } from "./columns";
import "./IssuesList.less";
import { getOverviewUsingMethods, MethodLines } from "@/api/module/codeLine";

interface IssuesListProps {
  issuesAndSuggestion: {
    title: string;
    badSmellDescription: string;
    suggestion: string;
  };
}

const DEFAULT_PAGE_SIZE = 5;

const IssuesList = (props: IssuesListProps) => {
  const { title, badSmellDescription, suggestion } = props.issuesAndSuggestion;
  const [count, setCount] = useState(0);
  const [issuesList, setIssuesList] = useState<MethodLines[]>([]);

  const loadDataByPageNumber = (current: number) => {
    getOverviewUsingMethods(current, DEFAULT_PAGE_SIZE).then((res) => {
      setCount(res.count);
      setIssuesList(res.data);
    });
  };

  useEffect(() => {
    loadDataByPageNumber(0);
  }, []);

  const onChange = (pagination: TablePaginationConfig) => {
    loadDataByPageNumber(pagination.current! - 1);
  };

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
        <Table
          className="issues-table"
          columns={columns}
          dataSource={issuesList}
          pagination={{
            total: count,
            defaultPageSize: DEFAULT_PAGE_SIZE,
          }}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default IssuesList;
