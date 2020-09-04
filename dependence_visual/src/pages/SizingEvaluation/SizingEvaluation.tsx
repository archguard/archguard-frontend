import React from 'react'
import IssuesList from './components/IssuesList'
import { IssuesConfigs } from './components/IssuesConfig.config'

const SizingEvaluation = () => {
  return (
    <div>
      <IssuesList issuesConfig={IssuesConfigs.METHOD} />
      <IssuesList issuesConfig={IssuesConfigs.CLASS} />
    </div>
  )
}

export default SizingEvaluation
