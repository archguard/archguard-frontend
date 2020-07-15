import Mock from 'mockjs'
import queryConfig from './queryConfig'
import deleteConfig from './deleteConfig'
import updateConfig from './updateConfig'
import createConfig from './createConfig'

const url = /\/config/

Mock.mock(url, 'get', queryConfig)
Mock.mock(url, 'delete', deleteConfig)
Mock.mock(url, 'put', updateConfig)
Mock.mock(url, 'post', createConfig)

