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
      <Tabs.TabPane tab="过大的包" key="package">
        <IssuesList issuesConfig={IssuesConfigs.PACKAGE} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过大的模块" key="module">
        <IssuesList issuesConfig={IssuesConfigs.MODULE} />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default SizingEvaluation
