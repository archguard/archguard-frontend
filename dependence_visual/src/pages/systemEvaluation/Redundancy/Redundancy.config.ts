import {
  classColumnRenderAsLink,
  renderDataClassFields,
} from "@/components/Business/IssuesList/ColumnRenderUtils";
import { IssuesConfig } from "@/components/Business/IssuesList/IssuesList";
import { storage } from "@/store/storage/sessionStorage";
const systemId = storage.getSystemId();

export const RedundancyConfig: { [key: string]: IssuesConfig } = {
  element: {
    title: "冗余元素",
    badSmellDescription: "不是必须的对象抽象，如只有一个方法的类，只有1个属性的类的列表。",
    suggestion: "重新梳理逻辑，减少冗余类",
    tableConfigs: [
      {
        title: "只有一个方法的类的列表",
        dataUrl: `/api/module/systems/${systemId}/redundancy/class/one-method`,
        columns: [
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
            dataIndex: "className",
            key: "className",
            render: classColumnRenderAsLink,
          },
        ],
      },
      {
        title: "只包含一个属性及get/set的类列表",
        dataUrl: `/api/module/systems/${systemId}/redundancy/class/one-field`,
        columns: [
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
            dataIndex: "className",
            key: "className",
            render: classColumnRenderAsLink,
          },
        ],
        expandable: {
          expandedRowRender: (record) => renderDataClassFields(record),
          rowExpandable: (record) => {
            return record.fields && record.fields.length;
          },
        },
      },
    ],
  },
  generalize: {
    title: "过度泛化",
    badSmellDescription:
      "为了保证系统能够提供可复用性和灵活性，系统常常使用接口，抽象类进行抽象。当过多的进行抽象，会导致过度泛化的问题。如出现只有一个继承/实现的接口/抽象类",
    suggestion: "重新梳理逻辑，减少过度泛化的类",
    tableConfigs: [
      {
        title: "只有一个继承/实现的接口/抽象类",
        dataUrl: `/api/module/systems/${systemId}/over-generalization/class/one-extends`,
        columns: [
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
            dataIndex: "className",
            key: "className",
            render: classColumnRenderAsLink,
          },
        ],
      },
    ],
  },
};
