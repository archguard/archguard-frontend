import React, { useEffect, useState } from "react";
import { Table, Tabs } from "antd";
import { useParams } from "umi";
import { getAllIssue } from "@/api/module/issue";
import { issueColumns } from "@/pages/system/systemSummary/Summary/columns/issueColumns";

const Issue = () => {
  const { systemId, type } = useParams();
  const [issues, setIssues] = useState({ } as any);

  useEffect(() => {
    getAllIssue(systemId).then((res) => {
      const issueMap = {};
      for (let issue of res) {
        if (!issueMap[issue.ruleType]) {
          issueMap[issue.ruleType] = [];
        }

        issueMap[issue.ruleType].push(issue);
      }

      setIssues(issueMap);
    });
  }, [setIssues]);

  const simpleName = (name: String) => {
    return name.replaceAll("_", " ")
  };

  return (
    <div>
      <Tabs activeKey={type}>
        {Object.keys(issues).map(function (key, index) {
            return (
              <Tabs.TabPane tab={simpleName(key)} key={ index }>
                <Table tableLayout={"auto"} dataSource={issues[key] as any} columns={issueColumns} />
              </Tabs.TabPane>
            );
          })}
      </Tabs>
    </div>
  );
};

export default Issue;
