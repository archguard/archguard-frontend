import Mock from 'mockjs'

import queryProjectOverView from './queryProjectOverView'

Mock.mock(/\/reports\/overview/, 'get', queryProjectOverView)

