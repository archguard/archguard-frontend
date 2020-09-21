import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { Tabs } from "antd";
import React from "react";
import { RedundancyConfig } from "./Redundancy.config";

interface RedundancyProps {
  children?: React.ReactNode;
}

export const Redundancy = (props: RedundancyProps) => {
  return (
    <Tabs onChange={() => {}} type="card">
      <Tabs.TabPane tab="冗余元素" key="element">
        <IssuesList issuesConfig={RedundancyConfig.element} />
      </Tabs.TabPane>
    </Tabs>
  );
};

Redundancy.defaultProps = {};

export default Redundancy;
