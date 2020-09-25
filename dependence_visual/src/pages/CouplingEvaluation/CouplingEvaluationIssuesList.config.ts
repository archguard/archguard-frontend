import { IssuesConfig } from "@/components/Business/IssuesList/IssuesList";
import { baseURL } from "@/api/module/config";
import {
  getHubColumns,
  deepInheritenceColumns,
  dataClumpsColumns,
  circularDependency,
} from "./CouplingEvaluationTableColumn.config";

enum CouplingEvaluationIssuesTypes {
  HUB = "HUB",
  DATA_CLUMPS = "DATA_CLUMPS",
  DEEP_INHERITENCE = "DEEP_INHERITENCE",
  CIRCULAR_DEPENDENCY = "CIRCULAR_DEPENDENCY",
}

export const CouplingEvaluationIssuesConfigs: {
  [key in CouplingEvaluationIssuesTypes]: IssuesConfig;
} = {
  HUB: {
    title: "枢纽模块",
    badSmellDescription:
      "当某个类与大量其他的类有依赖关系的时候，这种气味就会出现。当依赖过分集中在某个枢纽位置，会导致该位置的功能越来越难变更并慢慢被迫稳定，失去灵活性。",
    suggestion: "考虑拆分当前枢纽类，或合并某些外部依赖类",
    tableConfigs: [
      {
        title: "问题列表（出向依赖或入向依赖 > 8 的模块）：",
        dataUrl: baseURL + "/hub/modules/above-threshold",
        columns: getHubColumns("module"),
      },
      {
        title: "问题列表（出向依赖或入向依赖 > 8 的包）：",
        dataUrl: baseURL + "/hub/packages/above-threshold",
        columns: getHubColumns("package"),
      },
      {
        title: "问题列表（出向依赖或入向依赖 > 8 的类）：",
        dataUrl: baseURL + "/hub/classes/above-threshold",
        columns: getHubColumns("class"),
      },
      {
        title: "问题列表（出向依赖或入向依赖 > 8 的方法）：",
        dataUrl: baseURL + "/hub/methods/above-threshold",
        columns: getHubColumns("method"),
      },
    ],
  },
  DATA_CLUMPS: {
    title: "数据泥团",
    badSmellDescription:
      "关联关系弱的方法与属性被放置在同一个类中。如方法A仅使用了属性A，方法B仅使用了属性B，两者并无交集但同时出现在一个类中。SRP单一责任原则指出，一个类不应该有一个以上的变更理由。",
    suggestion: "把弱关联关系的方法和属性拆分到不同的类中。",
    tableConfigs: [
      {
        title: "问题列表（缺乏内聚指标LCOM4 > 2 的类）：",
        dataUrl: baseURL + "/coupling/data-clumps",
        columns: dataClumpsColumns,
      },
    ],
  },
  DEEP_INHERITENCE: {
    title: "过深继承",
    badSmellDescription:
      "深度继承层次结构可以产生极其灵活的系统。不幸的是，与此同时，系统的可理解性和继承层次结构的适应性也会受到影响。如果继承级别太深，将几乎不可能通过读取代码来确定调用了哪个方法的实现。",
    suggestion: "考虑拉平继承，或使用接口替代继承",
    tableConfigs: [
      {
        title: "问题列表（继承深度 > 6 的类）：",
        dataUrl: baseURL + "/coupling/deep-inheritance",
        columns: deepInheritenceColumns,
      },
    ],
  },
  CIRCULAR_DEPENDENCY: {
    title: "循环依赖",
    badSmellDescription: "循环依赖的坏味道描述",
    suggestion: "循环依赖的改进建议",
    tableConfigs: [
      {
        title: "问题列表（循环依赖的模块）：",
        dataUrl: baseURL + "/circular-dependency/module",
        columns: circularDependency,
      },
      {
        title: "问题列表（循环依赖的包）：",
        dataUrl: baseURL + "/circular-dependency/package",
        columns: circularDependency,
      },
      {
        title: "问题列表（循环依赖的类）：",
        dataUrl: baseURL + "/circular-dependency/class",
        columns: circularDependency,
      },
      {
        title: "问题列表（循环依赖的方法）：",
        dataUrl: baseURL + "/circular-dependency/method",
        columns: circularDependency,
      },
    ],
  },
};
