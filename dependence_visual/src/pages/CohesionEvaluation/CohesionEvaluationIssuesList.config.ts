import { IssuesConfig } from "@/components/Business/IssuesList/IssuesList";
import { baseURL } from "@/api/module/config";
import { DataClassColumns, shotgunSurgeryColumns } from "./CohesionEvaluationTableColumn.config";
import {
  classColumnRenderAsLinkByClazzes,
  renderDataClassFields,
} from "@/components/Business/IssuesList/ColumnRenderUtils";

export interface ShotgunSurgeryClazz {
  moduleName: string;
  packageName: string;
  className: string;
}

export interface ShotgunSurgery {
  commitMessage: string;
  commitId: string;
  clazzes: ShotgunSurgeryClazz[];
}

export interface DataClass {
  moduleName: string;
  packageName: string;
  className: string;
  fields: Array<{
    name: string;
    type: string;
  }>;
}

enum CohesionEvaluationIssuesTypes {
  SHOTGUN_SURGERY = "SHOTGUN_SURGERY",
  DATA_CLASS = "DATA_CLASS",
}

export const MAX_COUNT_OF_RENDER_CLASSES = 5;

export const CohesionEvaluationIssuesConfigs: {
  [key in CohesionEvaluationIssuesTypes]: IssuesConfig;
} = {
  SHOTGUN_SURGERY: {
    title: "散弹式修改",
    badSmellDescription:
      "如果每遇到某种变化，你都必须在许多不同的类做修改，你所面临的坏味道就是散弹式修改。当需要修改的代码散布四处，你不但很难找到它们，也很容易忘记某个重要的修改。",
    suggestion:
      "代码重构提升内聚如关联性非常强的功能被分散在了不同的模块、包、类中，就会导致每次变更该功能都需要修改不同的地方。可考虑通过移动方法、归并类等方式进行一定的合并。小步提交开发过程中，可以把需求拆分为小步去实现，每完成一小步就可以进行提交，这样更便于其他人明白每一步做了什么，也能提升持续集成的频率。应避免在本地开发了几天才集中做一次大提交，这很容易导致分支的合并地狱。让需求拆分粒度更小当需求粒度比较大，要实现的时候需要改动的类自然相对的多，可考虑把每个需求卡拆分到3天内能完成甚至更小。",
    tableConfigs: [
      {
        title: "问题列表",
        dataUrl: baseURL + "/cohesion/shotgun-surgery",
        columns: shotgunSurgeryColumns,
      },
    ],
    expandable: {
      expandedRowRender: (record: ShotgunSurgery) =>
        classColumnRenderAsLinkByClazzes(record.clazzes, record, true),
      rowExpandable: (record: ShotgunSurgery) => {
        return record.clazzes && record.clazzes.length > MAX_COUNT_OF_RENDER_CLASSES;
      },
    },
  },
  DATA_CLASS: {
    title: "数据类",
    badSmellDescription: "数据类.坏味道描述",
    suggestion: "数据类.改进建议",
    tableConfigs: [
      {
        title: "问题列表",
        dataUrl: baseURL + "/cohesion/data-class",
        columns: DataClassColumns,
      },
    ],
    expandable: {
      expandedRowRender: (record) => renderDataClassFields(record),
      rowExpandable: (record) => {
        return record.fields && record.fields.length;
      },
    },
  },
};
