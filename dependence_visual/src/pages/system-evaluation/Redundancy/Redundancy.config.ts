import { classColumnRenderAsLink } from "@/components/Business/IssuesList/ColumnRenderUtils";
import { IssuesConfig } from "@/components/Business/IssuesList/IssuesList";
import { storage } from "@/store/storage/sessionStorage";
const systemId = storage.getSystemId();

export const RedundancyConfig: { [key: string]: IssuesConfig } = {
  element: {
    title: "冗余元素",
    badSmellDescription: "冗余元素 badSmellDescription",
    suggestion: "冗余元素 suggestion",
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
      },
    ],
  },
};
