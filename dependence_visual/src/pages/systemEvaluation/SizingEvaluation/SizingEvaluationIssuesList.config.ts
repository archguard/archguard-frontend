import { IssuesConfig } from "@/components/Business/IssuesList/IssuesList";
import { baseURL } from "@/api/module/config";
import {
  methodColumns,
  packageColumns,
  moduleColumns,
  classColumnsByLines,
  classColumnsByMethodCount,
} from "./SizingEvaluationTableColumn.config";

enum SizingEvaluationIssuesTypes {
  "METHOD" = "METHOD",
  "CLASS" = "CLASS",
  "PACKAGE" = "PACKAGE",
  "MODULE" = "MODULE",
}

export const SizingEvaluationIssuesConfigs: {
  [key in SizingEvaluationIssuesTypes]: IssuesConfig;
} = {
  METHOD: {
    title: "过大的方法",
    badSmellDescription: "一个方法含有太多行代码。",
    suggestion: `拆分方法，寻找长方法内部的代码边界，并将其逐一抽取为私有方法。
  · 寻找代码边界的关键：找循环、找判断、找注释、找重复代码。
  · 另，在拆分方法改造时，应注意测试保护，尽可能先为原方法添加相应的单元测试/集成测试案例。
  · 并且，充分使用编辑器内置的重构菜单进行自动重构（如Intellij的Refactor-> Extract Method)，从而避免人手操作导致的失误。`,
    tableConfigs: [
      {
        title: (threshold = 30) => `问题列表（代码行数 > ${threshold} 行的方法）`,
        dataUrl: baseURL + "/sizing/methods/above-threshold",
        columns: methodColumns,
      },
    ],
  },
  CLASS: {
    title: "过大的类",
    badSmellDescription:
      "一个类含有太多行代码或太多的方法。这往往以为着这个类分工不明，承担了太多的指责，违反了SRP单一指责原则。",
    suggestion: `寻找类的内部边界进行拆分。如
  · 识别特性依恋，把相关的代码移动到另一个更依恋的类里（如，把针对某对象的运算逻辑移动到该对象内部）。
  · 识别共性/特性方法，把相关方法抽取到接口、父类或子类中。
  · 把业务关联较少的部分，拆解到不同的类中处理。
  · 把重复代码抽取到公共方法或公共类中。`,
    tableConfigs: [
      {
        title: (threshold = 600) => `问题列表（代码行数 > ${threshold} 行的类）`,
        dataUrl: baseURL + "/sizing/classes/above-line-threshold",
        columns: classColumnsByLines,
      },
      {
        title: (threshold = 20) => `问题列表（类中包含的方法 > ${threshold} 个的类）`,
        dataUrl: baseURL + "/sizing/classes/above-method-count-threshold",
        columns: classColumnsByMethodCount,
      },
    ],
  },
  PACKAGE: {
    title: "过大的包",
    badSmellDescription: "一个包中，包含了过多的代码或包含了过多的类。",
    suggestion:
      "拆包。把不同职责的类分到不同的包结构中，具体可参考如整洁架构、六边形架构等的规范。",
    tableConfigs: [
      {
        title: (threshold = 12000) => `问题列表（代码行数 > ${threshold} 行的包）`,
        dataUrl: baseURL + "/sizing/packages/above-line-threshold",
        columns: packageColumns,
      },
      {
        title: (threshold = 20) => `问题列表（所含的类 > ${threshold} 个的包）`,
        dataUrl: baseURL + "/sizing/packages/above-threshold",
        columns: packageColumns,
      },
    ],
  },
  MODULE: {
    title: "过大的模块",
    badSmellDescription: "一个子模块中包含了过多的代码或包含了过多的包。",
    suggestion: "拆模块。把不同职责的包拆分到不同的模块中。",
    tableConfigs: [
      {
        title: (threshold = 240000) => `问题列表（代码行数 > ${threshold} 行的模块）`,
        dataUrl: baseURL + "/sizing/modules/above-line-threshold",
        columns: moduleColumns,
      },
      {
        title: (threshold = 20) => `问题列表（所含Package包 > ${threshold} 个的模块）`,
        dataUrl: baseURL + "/sizing/modules/above-threshold",
        columns: moduleColumns,
      },
    ],
  },
};
