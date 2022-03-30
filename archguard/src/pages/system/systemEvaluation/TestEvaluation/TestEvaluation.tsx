import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { Tabs } from "antd";
import React from "react";
import { TEST_EVALUATION_CONFIG, TEST_EVALUATION_TAB } from "./TestEvaluation.config";
import styles from "./TestEvaluation.less";

interface TestEvaluationProps {
  children?: React.ReactNode;
}

const TestEvaluation = (props: TestEvaluationProps) => {
  return (
    <div className={styles.TestEvaluation}>
      <Tabs type="card">
        <Tabs.TabPane tab={TEST_EVALUATION_TAB.sleepTest} key="sleepTest">
          <IssuesList issuesConfig={TEST_EVALUATION_CONFIG.sleepTest} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={TEST_EVALUATION_TAB.ignore} key="ignore">
          <IssuesList issuesConfig={TEST_EVALUATION_CONFIG.ignore} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={TEST_EVALUATION_TAB.unAssert} key="unAssert">
          <IssuesList issuesConfig={TEST_EVALUATION_CONFIG.unAssert} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={TEST_EVALUATION_TAB.duplicateAssert} key="duplicateAssert">
          <IssuesList issuesConfig={TEST_EVALUATION_CONFIG.duplicateAssert} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={TEST_EVALUATION_TAB.redundantPrint} key="redundantPrint">
          <IssuesList issuesConfig={TEST_EVALUATION_CONFIG.redundantPrint} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={TEST_EVALUATION_TAB.staticMethod} key="staticMethod">
          <IssuesList issuesConfig={TEST_EVALUATION_CONFIG.staticMethod} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default TestEvaluation;
