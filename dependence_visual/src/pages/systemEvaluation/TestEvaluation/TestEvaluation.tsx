import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { Tabs } from "antd";
import React from "react";
import { config, tab } from "./TestEvaluation.config";
import styles from "./TestEvaluation.less";

interface TestEvaluationProps {
  children?: React.ReactNode;
}

const TestEvaluation = (props: TestEvaluationProps) => {
  return (
    <div className={styles.TestEvaluation}>
      <Tabs type="card">
        <Tabs.TabPane tab={tab.sleepTest} key="sleepTest">
          <IssuesList issuesConfig={config.sleepTest} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={tab.ignore} key="ignore">
          <IssuesList issuesConfig={config.ignore} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={tab.unAssert} key="unAssert">
          <IssuesList issuesConfig={config.unAssert} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={tab.duplicateAssert} key="duplicateAssert">
          <IssuesList issuesConfig={config.duplicateAssert} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={tab.redundantPrint} key="redundantPrint">
          <IssuesList issuesConfig={config.redundantPrint} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={tab.staticMethod} key="staticMethod">
          <IssuesList issuesConfig={config.staticMethod} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default TestEvaluation;
