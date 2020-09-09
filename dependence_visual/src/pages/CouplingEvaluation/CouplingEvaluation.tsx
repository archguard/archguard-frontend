import React, { useState } from 'react'
import { Tabs } from 'antd'
import IssuesList from '@/components/IssuesList/IssuesList'
import { CouplingEvaluationIssuesConfigs } from './CouplingEvaluationIssuesList.config'

const CouplingEvaluation = () => {
  const [hubParameter, setHubParameter] = useState<any>({ orderByFanIn: true })

  return (
    <Tabs onChange={() => {}} type="card">
      <Tabs.TabPane tab="枢纽模块" key="hub">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.HUB}
          parameter={hubParameter}
          onSortChange={(sorter) => {
            setHubParameter({ orderByFanIn: sorter.field === 'fanIn' })
          }}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="数据泥团" key="data-clumps">
        <IssuesList
          issuesConfig={CouplingEvaluationIssuesConfigs.DATA_CLUMPS}
          parameter={hubParameter} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="过深继承" key="deep-inheritence">
        <IssuesList issuesConfig={CouplingEvaluationIssuesConfigs.DEEP_INHERITENCE} />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default CouplingEvaluation
