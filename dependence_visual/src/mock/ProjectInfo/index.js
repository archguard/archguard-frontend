import Mock from 'mockjs'

import querySystemInfo from './querySystemInfo'
import createSystemInfo from './createSystemInfo'
import updateSystemInfo from './updateSystemInfo'

const url = /\/system\/info/

Mock.mock(url, 'get', querySystemInfo)
Mock.mock(url, 'post', createSystemInfo)
Mock.mock(url, 'put', updateSystemInfo)

