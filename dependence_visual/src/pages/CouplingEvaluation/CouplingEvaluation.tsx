import React from 'react'
import IssuesList from '../SizingEvaluation/components/IssuesList'
import { IssuesConfigs } from '../SizingEvaluation/components/IssuesConfig.config'
import { Tabs } from 'antd'

const CouplingEvaluation = () => {
  return (
    <Tabs onChange={() => {}} type="card">
      <Tabs.TabPane tab="枢纽模块" key="hub">
        <IssuesList issuesConfig={IssuesConfigs.HUB} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="数据泥团" key="data-clumps">
        <IssuesList issuesConfig={IssuesConfigs.DATA_CLUMPS} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过深继承" key="deep-inheritence">
        <IssuesList issuesConfig={IssuesConfigs.DEEP_INHERITENCE} />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default CouplingEvaluation
