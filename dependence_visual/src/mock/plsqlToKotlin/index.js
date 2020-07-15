import Mock from 'mockjs'

import plsqlToKotlin from './plsqlToKotlin'

Mock.mock(/\/plsql\/kotlin/, 'post', plsqlToKotlin)