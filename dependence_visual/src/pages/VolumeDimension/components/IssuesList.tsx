import React, { useState, useEffect } from 'react'
import { Table } from 'antd';
import { columns } from './columns';
import './IssuesList.less'
import { getOverviewUsingMethods } from '@/api/module/codeLine';

interface IssuesListProps {
  issuesAndSuggestion: {
    title: string;
    badSmellDescription: string;
    suggestion: string;
  },
}

const IssuesList = (props: IssuesListProps) => {
  const { title, badSmellDescription, suggestion } = props.issuesAndSuggestion
  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [count, setCount] = useState(0)
  const [issuesList, setIssuesList] = useState([]);

  useEffect(() => {
    getOverviewUsingMethods(currentPageNumber, pageSize).then((res) => {
      console.log(res)
    })
  }, [])

  // const data = [{
  //     module: 'module',
  //     package: 'package',
  //     class: 'class',
  //     methodName: 'methodName',
  //     codeRows: 10000,
  //   },
  // ];

  return (
    <div className="issues-list">
      <div className="issues-list-header x-between">
        <span className="issues-list-title">{ title }</span>
        <span className={`issues-list-count ${ count ? 'red' : 'green' }`}>{ count }</span>
      </div>
      <div className="issues-list-content">
        <div className="issues-desc">
          <span>坏味道描述：</span>
          <span>{ badSmellDescription }</span>
        </div>
        <div className="issues-suggest">
          <span>改进建议：</span>
          <span>{ suggestion }</span>
        </div>
        <Table className="issues-table" columns={columns} dataSource={issuesList} />
      </div>
    </div>
  )
}

export default IssuesList
