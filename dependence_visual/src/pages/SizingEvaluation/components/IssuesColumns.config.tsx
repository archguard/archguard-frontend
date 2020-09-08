import React from 'react'
import { MethodLines } from '@/api/module/codeLine'
import { Tooltip } from 'antd'
import { Link } from 'umi'
import { storage } from '@/store/storage/sessionStorage'

const classColumnRender = (text: string, record: MethodLines) => {
  const module = record.moduleName
  const className = [record.packageName, record.typeName].join('.')

  return (
    <Tooltip title={text}>
      <Link
        to={{
          pathname: `/${storage.getSystemId()}/analysis/dependence/class`,
          search: `module=${module}&className=${className}&dependenceType=dependencies`
        }}>
        {text}
      </Link>
    </Tooltip>
  )
}

const methodColumnRender = (text: string, record: MethodLines) => {
  const module = record.moduleName
  const className = [record.packageName, record.typeName].join('.')
  const methodName = record.methodName

  return (
    <Tooltip title={text}>
      <Link
        to={{
          pathname: `/${storage.getSystemId()}/analysis/dependence/method`,
          search: `module=${module}&className=${className}&methodName=${methodName}&dependenceType=invokes`
        }}>
        {text}
      </Link>
    </Tooltip>
  )
}

export const methodColumns = [{
  title: '模块',
  dataIndex: 'moduleName',
  key: 'moduleName',
}, {
  title: '包',
  dataIndex: 'packageName',
  key: 'packageName',
}, {
  title: '类',
  dataIndex: 'typeName',
  key: 'typeName',
  render: classColumnRender,
}, {
  title: '方法',
  dataIndex: 'methodName',
  key: 'methodName',
  render: methodColumnRender,
}, {
  minWidth: 100,
  title: '代码行数',
  dataIndex: 'lines',
  key: 'lines',
}];

export const classColumnsByMethodCount = [{
  title: '模块',
  dataIndex: 'moduleName',
  key: 'moduleName',
}, {
  title: '包',
  dataIndex: 'packageName',
  key: 'packageName',
}, {
  title: '类',
  dataIndex: 'typeName',
  key: 'typeName',
  render: classColumnRender,
}, {
  minWidth: 100,
  title: '方法个数',
  dataIndex: 'methodCount',
  key: 'methodCount',
}];

export const classColumnsByLines = [{
  title: '模块',
  dataIndex: 'moduleName',
  key: 'moduleName',
}, {
  title: '包',
  dataIndex: 'packageName',
  key: 'packageName',
}, {
  title: '类',
  dataIndex: 'typeName',
  key: 'typeName',
  render: classColumnRender,
}, {
  minWidth: 100,
  title: '代码行数',
  dataIndex: 'lines',
  key: 'lines',
}];

export const packageColumns = [{
  title: '模块',
  dataIndex: 'moduleName',
  key: 'moduleName',
}, {
  title: '包',
  dataIndex: 'packageName',
  key: 'packageName',
}, {
  minWidth: 100,
  title: 'class数量',
  dataIndex: 'classCount',
  key: 'classCount',
}, {
  minWidth: 100,
  title: '代码行数',
  dataIndex: 'lines',
  key: 'lines',
}]

export const moduleColumns = [{
  title: '模块',
  dataIndex: 'moduleName',
  key: 'moduleName',
}, {
  title: 'package数量',
  dataIndex: 'packageCount',
  key: 'packageCount',
}, {
  minWidth: 100,
  title: 'class数量',
  dataIndex: 'classCount',
  key: 'classCount',
}, {
  minWidth: 100,
  title: '代码行数',
  dataIndex: 'lines',
  key: 'lines',
}]

export const hubColumns = [{
  title: '模块',
  dataIndex: 'moduleName',
  key: 'moduleName',
}, {
  title: '包',
  dataIndex: 'packageName',
  key: 'packageName',
}, {
  title: '类',
  dataIndex: 'typeName',
  key: 'typeName',
  render: classColumnRender,
}, {
  minWidth: 100,
  title: '入向依赖',
  dataIndex: 'fanIn',
  key: 'fanIn',
}, {
  minWidth: 100,
  title: '出向依赖',
  dataIndex: 'fanOut',
  key: 'fanOut',
}];

export const dataClumpsColumns = [{
  title: '模块',
  dataIndex: 'moduleName',
  key: 'moduleName',
}, {
  title: '包',
  dataIndex: 'packageName',
  key: 'packageName',
}, {  
  title: '类',
  dataIndex: 'typeName',
  key: 'typeName',
  render: classColumnRender,
}, {
  minWidth: 100,
  title: '缺乏内聚度',
  dataIndex: 'lcom4',
  key: 'lcom4',
}];


export const deepInheritenceColumns = [{
  title: '模块',
  dataIndex: 'moduleName',
  key: 'moduleName',
}, {
  title: '包',
  dataIndex: 'packageName',
  key: 'packageName',
}, {  
  title: '类',
  dataIndex: 'typeName',
  key: 'typeName',
  render: classColumnRender,
},  {
  minWidth: 100,
  title: '继承深度',
  dataIndex: 'dit',
  key: 'dit',
}];
