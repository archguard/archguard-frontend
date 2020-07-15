import Mock from 'mockjs'

import queryHotSpot from './queryHotSpot'
import queryScatterCommits from './queryScatterCommits'

Mock.mock(/\/git\/hotspot/, 'get', queryHotSpot)
Mock.mock(/\/git\/scatter-commits/, 'get', queryScatterCommits)