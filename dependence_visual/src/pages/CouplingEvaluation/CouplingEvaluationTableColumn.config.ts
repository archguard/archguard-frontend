import {
  classColumnRenderAsLink,
  circularDependencyColumnRender,
  methodColumnRenderAsLink,
} from "@/components/Business/IssuesList/ColumnRenderUtils";

enum columnCount {
  module = 1,
  package = 2,
  class = 3,
  method = 4,
}

const getClazzColumnsBy = (type: keyof typeof columnCount) => {
  const moduleColumn = {
    title: "枢纽模块",
    dataIndex: "moduleName",
    key: "moduleName",
  };

  const packageColumn = {
    title: "枢纽包",
    dataIndex: "packageName",
    key: "packageName",
  };

  const classColumn = {
    title: "枢纽类",
    dataIndex: "typeName",
    key: "typeName",
    render: classColumnRenderAsLink,
  };

  const methodColumn = {
    title: "枢纽方法",
    dataIndex: "methodName",
    key: "methodName",
    render: methodColumnRenderAsLink,
  };

  return [moduleColumn, packageColumn, classColumn, methodColumn].slice(0, columnCount[type]);
};

export const getHubColumns = (type: keyof typeof columnCount) => [
  ...getClazzColumnsBy(type),
  {
    minWidth: 100,
    title: "入向依赖",
    dataIndex: "fanIn",
    key: "fanIn",
    sorter: true,
    defaultSortOrder: "descend",
    sortDirections: ["descend"],
  },
  {
    minWidth: 100,
    title: "出向依赖",
    dataIndex: "fanOut",
    key: "fanOut",
    sorter: true,
    sortDirections: ["descend"],
  },
];

export const dataClumpsColumns = [
  {
    title: "模块",
    dataIndex: "moduleName",
    key: "moduleName",
  },
  {
    title: "包",
    dataIndex: "packageName",
    key: "packageName",
  },
  {
    title: "类",
    dataIndex: "typeName",
    key: "typeName",
    render: classColumnRenderAsLink,
  },
  {
    minWidth: 100,
    title: "缺乏内聚度",
    dataIndex: "lcom4",
    key: "lcom4",
  },
];

export const deepInheritenceColumns = [
  {
    title: "模块",
    dataIndex: "moduleName",
    key: "moduleName",
  },
  {
    title: "包",
    dataIndex: "packageName",
    key: "packageName",
  },
  {
    title: "类",
    dataIndex: "typeName",
    key: "typeName",
    render: classColumnRenderAsLink,
  },
  {
    minWidth: 100,
    title: "继承深度",
    dataIndex: "dit",
    key: "dit",
  },
];

export const circularDependency = [
  {
    title: "循环依赖",
    dataIndex: "circularDependency",
    render: circularDependencyColumnRender,
  },
];
