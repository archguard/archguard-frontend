import React, { useEffect, useState } from "react";
import { Table, Tabs } from "antd";
import { useParams } from "umi";
import { getAllIssue } from "@/api/module/issue";
import { issueColumns } from "@/pages/system/systemSummary/Summary/columns/issueColumns";

const Issue = () => {
  const { systemId, type } = useParams();
  const [issues, setIssues] = useState([] as any);
  const [testIssues, setTestIssues] = useState([] as any);
  const [sqlIssues, setSqlIssues] = useState([] as any);

  useEffect(() => {
    getAllIssue(systemId).then((res) => {
      setTestIssues(res.filter((val) => val.ruleType === "TEST_CODE_SMELL"))
      setSqlIssues(res.filter((val) => val.ruleType === "SQL_SMELL"))
    });
  }, [setIssues, setTestIssues, setSqlIssues]);

  return (
    <div>
      <Tabs activeKey={type}>
        <Tabs.TabPane tab="Test Smell" key="test">
          <Table tableLayout={"auto"} dataSource={testIssues} columns={issueColumns} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="SQL Smell" key="sql">
          <Table tableLayout={"auto"} dataSource={sqlIssues} columns={issueColumns} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Issue;
