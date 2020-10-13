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
    badSmellDescription: "不是必须的对象抽象，如只有一个方法的类，只有一个属性的类。",
    suggestion: `
  · 当只有一个属性的时候，可以考虑先使用基础类型，在发现强关联的属性增加到2～3个后再考虑提炼为对象。
  · 同理，当只有一个方法的时候也未必需要马上提取在独立的类中。`,
    tableConfigs: [
      {
        title: () => "只有一个方法的类的列表",
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
        title: () => "只包含一个属性及get/set的类列表。",
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
      "为了保证系统能够提供可复用性和灵活性，系统常常使用接口，抽象类进行抽象。当过多的进行抽象，会导致过度泛化的问题。如出现只有一个继承/实现的接口/抽象类。",
    suggestion: "重新梳理逻辑，减少过度泛化的类。",
    tableConfigs: [
      {
        title: () => "只有一个继承/实现的接口/抽象类",
        dataUrl: `/api/module/systems/${systemId}/redundancy/class/over-generalization`,
        columns: [
          {
            title: "父模块名",
            dataIndex: "parentModuleName",
            key: "parentModuleName",
          },
          {
            title: "父包名",
            dataIndex: "parentPackageName",
            key: "parentPackageName",
          },
          {
            title: "父类名",
            dataIndex: "parentClassName",
            key: "parentClassName",
            render: (text, record) => {
              return classColumnRenderAsLink(text, {
                ...record,
                packageName: record.parentPackageName,
                moduleName: record.parentModuleName,
                className: record.parentClassName
              });
            },
          },
          {
            title: "子模块名",
            dataIndex: "childModuleName",
            key: "childModuleName",
          },
          {
            title: "子包名",
            dataIndex: "childPackageName",
            key: "childPackageName",
          },
          {
            title: "子类名",
            dataIndex: "childClassName",
            key: "childClassName",
            render: (text, record) => {
              return classColumnRenderAsLink(text, {
                ...record,
                packageName: record.childPackageName,
                moduleName: record.childModuleName,
                className: record.childClassName
              });
            },
          },
        ],
      },
    ],
  },
};
