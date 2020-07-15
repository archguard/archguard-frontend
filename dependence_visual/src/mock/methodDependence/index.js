import Mock from 'mockjs'

import queryMethodDependence from './queryMethodDependence'

Mock.mock(/\/api\/dependence\/method\//, 'get', queryMethodDependence)