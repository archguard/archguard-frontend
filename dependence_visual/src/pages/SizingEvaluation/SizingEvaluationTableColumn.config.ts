import {
  classColumnRenderAsLink,
  methodColumnRenderAsLink
} from '@/components/Business/IssuesList/ColumnRenderUtils';

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
  render: classColumnRenderAsLink,
}, {
  title: '方法',
  dataIndex: 'methodName',
  key: 'methodName',
  render: methodColumnRenderAsLink,
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
  render: classColumnRenderAsLink,
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
  render: classColumnRenderAsLink,
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
