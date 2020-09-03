import React from 'react'
import IssuesList from './components/IssuesList'
import { IssuesAndSuggestion } from './IssuesAndSuggestion.config'

const VolumeDimension = () => {
  return (
    <div>
      <IssuesList issuesAndSuggestion={IssuesAndSuggestion.METHOD} />
    </div>
  )
}

export default VolumeDimension
