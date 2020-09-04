import React from 'react'
import IssuesList from '../SizingEvaluation/components/IssuesList'
import { IssuesConfigs } from '../SizingEvaluation/components/IssuesConfig.config'

const CouplingEvaluation = () => {
  return (
    <div>
      <IssuesList issuesConfig={IssuesConfigs.HUB} />
    </div>
  )
}

export default CouplingEvaluation
