import Mock from 'mockjs'

import queryBadSmells from './queryBadSmells'
import queryCodeStyles from './queryCodeStyles'
import queryTestBadSmells from './queryTestBadSmells'
import queryTestCoverages from './queryTestCoverages'

Mock.mock(/\/reports\/bad-smells/, 'get', queryBadSmells)
Mock.mock(/\/checkstyle\/overview/, 'get', queryCodeStyles)
Mock.mock(/\/reports\/test-bad-smells/, 'get', queryTestBadSmells)
Mock.mock(/\/coverage\/bundle/, 'get', queryTestCoverages)




