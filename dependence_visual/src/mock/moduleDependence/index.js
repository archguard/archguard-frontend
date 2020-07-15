import Mock from 'mockjs'

import queryModuleDependence from './queryModuleDependence'
import queryAllModuleDependence from './queryAllModuleDependence'

Mock.mock(/\/api\/dependence\/method_method/, 'get', queryModuleDependence)

Mock.mock(/\/module\/dependence\/all/, 'get', queryAllModuleDependence)