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
    title: "霰弹式修改",
    badSmellDescription:
      "如果每遇到某种变化，都必须在许多不同的类做修改，你所面临的坏味道就是霰弹式修改。当需要修改的代码散布四处，你不但很难找到它们，也很容易忘记某个重要的修改。",
    suggestion: `代码重构提升内聚，如：
  · 当关联性非常强的功能被分散在了不同的模块、包、类中，可考虑通过移动方法、归并类等方式进行一定的合并。
  · 把需求拆分为小步去实现，每完成一小步就可以进行提交，这样更便于其他人明白每一步做了什么，也能提升持续集成的频率。应避免在本地开发了几天才集中做一次大提交，这很容易导致分支的合并地狱。
  · 让需求拆分粒度更小，如：把每个需求卡拆分到3天内能完成甚至更小。`,
    tableConfigs: [
      {
        title: () => "问题列表",
        dataUrl: baseURL + "/cohesion/shotgun-surgery",
        columns: shotgunSurgeryColumns,
        expandable: {
          expandedRowRender: (record: ShotgunSurgery) =>
            classColumnRenderAsLinkByClazzes(record.clazzes, record, true),
          rowExpandable: (record: ShotgunSurgery) => {
            return record.clazzes && record.clazzes.length > MAX_COUNT_OF_RENDER_CLASSES;
          },
        },
      },
    ],
  },
  DATA_CLASS: {
    title: "数据类",
    badSmellDescription:
      "数据类指的是只包含字段属性和用于访问属性的粗糙方法(如：getter、setter、toString)的类。这些类不包含任何额外的功能，并且不能独立地操作它们所拥有的数据，而只能作为被其他类操作的数据容器。",
    suggestion:
      "一个新创建的类只包含几个公共字段(和它们的getter、setter)是正常的。但是面向对象的真正强大之处在于，对象本身可以包含对其数据的行为或操作。你可以考虑检查调用该类的客户端代码。在其中，您可能会发现有些功能更适合于放置于数据类内部，如不依赖于第三方的纯数据内部运算、判断逻辑等。如果是这种情况，可使用Extract方法和Move方法将该功能迁移到数据类内。",
    tableConfigs: [
      {
        title: () => "问题列表",
        dataUrl: baseURL + "/cohesion/data-class",
        columns: DataClassColumns,
        expandable: {
          expandedRowRender: (record) => renderDataClassFields(record),
          rowExpandable: (record) => {
            return record.fields && record.fields.length;
          },
        },
      },
    ],
  },
};
