import Mock from 'mockjs'

import queryProjectInfo from './queryProjectInfo'
import createProjectInfo from './createProjectInfo'
import updateProjectInfo from './updateProjectInfo'

const url = /\/project\/info/

Mock.mock(url, 'get', queryProjectInfo)
Mock.mock(url, 'post', createProjectInfo)
Mock.mock(url, 'put', updateProjectInfo)

