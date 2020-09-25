import { classColumnRenderAsLinkByClazzes } from "@/components/Business/IssuesList/ColumnRenderUtils";
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
    key: "clazzes",
    width: 150,
    render: (text: ShotgunSurgeryClazz[]) => text.length.toString(),
  },
  {
    title: "该提交内改动的类列表",
    dataIndex: "clazzes",
    key: "clazzes",
    render: classColumnRenderAsLinkByClazzes,
  },
];
