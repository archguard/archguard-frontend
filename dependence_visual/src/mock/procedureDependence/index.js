import Mock from 'mockjs'

import queryProcedureDependence from './procedureDependence'

Mock.mock(/\/plsql\/.*\/.*\/calle[er]s/, 'get', queryProcedureDependence)