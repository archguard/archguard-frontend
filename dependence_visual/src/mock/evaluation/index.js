import Mock from 'mockjs'

import createEvaluation from './createEvaluation'
import checkEvaluationState from './checkEvaluationState'

Mock.mock(/\/scanner\/evaluations/, 'post', createEvaluation)
Mock.mock(/\/evaluations\/status/, 'get', checkEvaluationState)