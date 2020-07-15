import Mock from 'mockjs'

import queryClassDependence from './queryClassDependence'

Mock.mock(/\/api\/dependence\/class/, 'get', queryClassDependence)