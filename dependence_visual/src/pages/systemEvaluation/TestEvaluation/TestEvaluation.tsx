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
        <Tabs.TabPane tab="含Sleep的测试" key="sleepTest">
          <IssuesList issuesConfig={config.sleepTest} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="繁杂判断" key="duplicateAssert">
          <IssuesList issuesConfig={config.duplicateAssert} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="冗余打印" key="redundantPrint">
          <IssuesList issuesConfig={config.redundantPrint} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="被忽略的测试" key="ignore">
          <IssuesList issuesConfig={config.ignore} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="空测试" key="empty">
          <IssuesList issuesConfig={config.empty} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="没有自动校验的测试" key="unAssert">
          <IssuesList issuesConfig={config.unAssert} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default TestEvaluation;
