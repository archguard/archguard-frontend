import {
  classColumnRenderAsLink,
  classColumnRenderAsLinkByClazzes,
} from "@/components/Business/IssuesList/ColumnRenderUtils";
import { ShotgunSurgeryClazz } from "./CohesionEvaluationIssuesList.config";

export const shotgunSurgeryColumns = [
  {
    title: "提交信息",
    dataIndex: "commitMessage",
    key: "commitMessage",
  },
  {
    title: "涉及改动的文件数",
    dataIndex: "clazzes",
    key: "commitId",
    width: 150,
    render: (text: ShotgunSurgeryClazz[]) => text.length.toString(),
  },
  {
    title: "该提交内改动的类列表",
    dataIndex: "clazzes",
    key: "clazzes",
    render: (text: ShotgunSurgeryClazz[], record: any) =>
      classColumnRenderAsLinkByClazzes(text, record, false),
  },
];

export const DataClassColumns = [
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
    render: (text: string, record: any) => classColumnRenderAsLink(text, record),
  },
];
