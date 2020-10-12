import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { Tabs } from "antd";
import React from "react";
import { config } from "./TestEvaluation.config";
import styles from "./TestEvaluation.less";

interface TestEvaluationProps {
  children?: React.ReactNode;
}

const TestEvaluation = (props: TestEvaluationProps) => {
  return (
    <div className={styles.TestEvaluation}>
      <Tabs type="card">
        <Tabs.TabPane tab="静态方法" key="staticMethod">
          <IssuesList issuesConfig={config.staticMethod} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="sleepTest" key="sleepTest">
          <IssuesList issuesConfig={config.sleepTest} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

TestEvaluation.defaultProps = {};

export default TestEvaluation;
