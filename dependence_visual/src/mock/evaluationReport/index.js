import Mock from 'mockjs'

import queryEvaluationReportList from './queryEvaluationReportList'
import queryEvaluationReport from './queryEvaluationReport'
import queryEvaluationReportDetails from './queryEvaluationReportDetails'

Mock.mock(/\/addition\/evaluations$/, 'get', queryEvaluationReportList)
Mock.mock(/\/addition\/evaluations\//, 'get', queryEvaluationReport)
Mock.mock(/\/addition\/evaluation-details\//, 'get', queryEvaluationReportDetails)

