import {
  classColumnRenderAsLink,
  circularDependencyColumnRender,
} from "@/components/Business/IssuesList/ColumnRenderUtils";

export const hubColumns = [
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
