import React from 'react'
import IssuesList from './components/IssuesList'
import { IssuesConfigs } from './components/IssuesConfig.config'
import { Tabs } from 'antd'

const SizingEvaluation = () => {
  return (
    <Tabs onChange={() => {}} type="card">
      <Tabs.TabPane tab="过大的方法" key="method">
        <IssuesList issuesConfig={IssuesConfigs.METHOD} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过大的类" key="class">
        <IssuesList issuesConfig={IssuesConfigs.CLASS} />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default SizingEvaluation
