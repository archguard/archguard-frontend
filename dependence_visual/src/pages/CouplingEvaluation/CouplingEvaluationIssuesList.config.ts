import { IssuesConfig } from "@/components/Business/IssuesList/IssuesList";
import { baseURL } from "@/api/module/config";
import {
  getHubColumns,
  deepInheritenceColumns,
  dataClumpsColumns,
  circularDependency,
} from "./CouplingEvaluationTableColumn.config";

enum CouplingEvaluationIssuesTypes {
  HUB_MODULE = "HUB_MODULE",
  HUB_PACKAGE = "HUB_PACKAGE",
  HUB_CLASS = "HUB_CLASS",
  HUB_METHOD = "HUB_METHOD",
  DATA_CLUMPS = "DATA_CLUMPS",
  DEEP_INHERITENCE = "DEEP_INHERITENCE",
  CIRCULAR_DEPENDENCY = "CIRCULAR_DEPENDENCY",
}

export const CouplingEvaluationIssuesConfigs: {
  [key in CouplingEvaluationIssuesTypes]: IssuesConfig;
} = {
  HUB_MODULE: {
    title: "枢纽模块",
    badSmellDescription:
      "当某个模块与大量其他的模块有依赖关系的时候，这种气味就会出现。当依赖过分集中在某个枢纽位置，会导致该位置的功能越来越难变更并慢慢被迫稳定，失去灵活性。",
    suggestion: "考虑拆分当前枢纽模块，或合并某些外部依赖模块",
    tableConfigs: [
      {
        title: "问题列表（出向依赖或入向依赖 > 8 的模块）",
        dataUrl: baseURL + "/hub/modules/above-threshold",
        columns: getHubColumns("module"),
      },
    ],
  },
  HUB_PACKAGE: {
    title: "枢纽包",
    badSmellDescription:
      "当某个包与大量其他的包有依赖关系的时候，这种气味就会出现。当依赖过分集中在某个枢纽位置，会导致该位置的功能越来越难变更并慢慢被迫稳定，失去灵活性。",
    suggestion: "考虑拆分当前枢纽包，或合并某些外部依赖包",
    tableConfigs: [
      {
        title: "问题列表（出向依赖或入向依赖 > 8 的包）",
        dataUrl: baseURL + "/hub/packages/above-threshold",
        columns: getHubColumns("package"),
      },
    ],
  },
  HUB_CLASS: {
    title: "枢纽类",
    badSmellDescription:
      "当某个类与大量其他的类有依赖关系的时候，这种气味就会出现。当依赖过分集中在某个枢纽位置，会导致该位置的功能越来越难变更并慢慢被迫稳定，失去灵活性。",
    suggestion: "考虑拆分当前枢纽类，或合并某些外部依赖类",
    tableConfigs: [
      {
        title: "问题列表（出向依赖或入向依赖 > 8 的类）",
        dataUrl: baseURL + "/hub/classes/above-threshold",
        columns: getHubColumns("class"),
      },
    ],
  },
  HUB_METHOD: {
    title: "枢纽方法",
    badSmellDescription:
      "当某个方法与大量其他的方法有依赖关系的时候，这种气味就会出现。当依赖过分集中在某个枢纽位置，会导致该位置的功能越来越难变更并慢慢被迫稳定，失去灵活性。",
    suggestion: "考虑拆分当前枢纽方法，或合并某些外部依赖方法",
    tableConfigs: [
      {
        title: "问题列表（出向依赖或入向依赖 > 8 的方法）",
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
        title: "问题列表（缺乏内聚指标LCOM4 > 2 的类）",
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
        title: "问题列表（继承深度 > 6 的类）",
        dataUrl: baseURL + "/coupling/deep-inheritance",
        columns: deepInheritenceColumns,
      },
    ],
  },
  CIRCULAR_DEPENDENCY: {
    title: "循环依赖",
    badSmellDescription:
      "在模块、包、类、方法之间总会存在相互调用及依赖的关系，当两者或多者之间的依赖关系形成了一个闭环（如A依赖B、B依赖C、 C依赖A），则被识别为循环依赖，也可以称之为循环引用。这循环中的某一点产生不稳定变化，都可能会导致整个环产生不稳定变化。从软件设计的角度来看，最大的问题是相互依赖的模块之间的紧密耦合，这会导致单个模块的单独重用成为不可能。",
    suggestion:
      "当各层级模块之间发生循环依赖，往往标示着他们在某方面有紧密耦合的需求，此时应该回顾看模块的划分是否合理：- 考虑是否应该把循环依赖的多方进行一定的合并- 考虑更改模块间的其中一些依赖方向从而打破闭环，如在实现回调功能时可能会引入循环依赖关系。这时可以考虑通过应用像observer模式这样的设计模式来避免",
    tableConfigs: [
      {
        title: "问题列表（循环依赖的模块）",
        dataUrl: baseURL + "/circular-dependency/module",
        columns: circularDependency,
      },
      {
        title: "问题列表（循环依赖的包）",
        dataUrl: baseURL + "/circular-dependency/package",
        columns: circularDependency,
      },
      {
        title: "问题列表（循环依赖的类）",
        dataUrl: baseURL + "/circular-dependency/class",
        columns: circularDependency,
      },
      {
        title: "问题列表（循环依赖的方法）",
        dataUrl: baseURL + "/circular-dependency/method",
        columns: circularDependency,
      },
    ],
  },
};
