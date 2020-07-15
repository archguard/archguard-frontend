import Mock from 'mockjs'

import queryAllPackageDependence from './queryAllPackageDependence'

Mock.mock(/\/package\/dependence\/all/, 'get', queryAllPackageDependence)