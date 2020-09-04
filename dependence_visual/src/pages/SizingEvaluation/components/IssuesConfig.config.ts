import { methodColumns, classColumnsByMethodCount, classColumnsByLines, hubColumns } from './IssuesColumns.config';
import { baseURL } from '@/api/module/config';

export interface IssuesTableConfig {
  title: string;
  dataUrl: string;
  parameter?: any;
  columns: Array<{
    title: string;
    dataIndex: string;
    key: string;
  }>;
}

export interface IssuesConfig {
  title: string;
  badSmellDescription: string;
  suggestion: string;
  tableConfigs: IssuesTableConfig[];
}

enum IssuesTypes {
  "METHOD" = "METHOD",
  "CLASS" = "CLASS",
  "HUB" = "HUB",
}

export const IssuesConfigs: {
  [key in IssuesTypes]: IssuesConfig;
} = {
  METHOD: {
    title: '过大的方法',
    badSmellDescription: '一个方法含有太多行代码。一般来说，任何方法超过 10 行时，你就可以考虑是不是过长了。',
    suggestion: '拆分方法，寻找长方法内部的代码边界并将其逐一抽取为私有方法。寻找代码边界的关键：找循环，找判断，找注释，找重复代码。另，在拆分方法改造时，应注意测试保护，尽可能先为原方法添加相应的单元测试/集成测试案例。并且，充分使用编辑器内置的重构菜单进行自动重构（如Intellij的Refactor-> Extract Method)，从而避免人手操作导致的失误。',
    tableConfigs: [{
      title: '问题列表（代码行数 > 30行的方法）：',
      dataUrl: baseURL + "/sizing/methods/above-threshold",
      columns: methodColumns,
    }],
  },
  CLASS: {
    title: '过大的类',
    badSmellDescription: '一个类含有太多行代码或太多的方法。这往往以为着这个类分工不明，承担了太多的指责，违反了SRP单一指责原则。',
    suggestion: `拆分类。如：识别特性依恋，把相关的代码移动到另一个更依恋的类里。（如针对某对象的运算，可以把该运算逻辑移动到该对象内部），识别共性/特性方法，把相关方法抽取到接口、父类或子类中。把业务关联较少的部分，拆解到不同的类中处理。把重复代码抽取到公共方法或公共类中`,
    tableConfigs: [{
      title: '问题列表（代码行数 > 600行的类）：',
      dataUrl: baseURL + "/sizing/classes/above-line-threshold",
      columns: classColumnsByLines,
    }, {
      title: '问题列表（类中包含的方法 > 20个的类）：',
      dataUrl: baseURL + "/sizing/classes/above-method-count-threshold",
      columns: classColumnsByMethodCount,
    }],
  },
  HUB: {
    title: '枢纽模块',
    badSmellDescription: '当某个类与大量其他的类有依赖关系的时候，这种气味就会出现。',
    suggestion: '拆分当前枢纽类，合并某些外部依赖类',
    tableConfigs: [{
      title: '问题列表（代码行数 > 30行的方法）：',
      dataUrl: baseURL + "/hub/classes/above-threshold",
      columns: hubColumns,
      parameter: { orderByFanIn: true },
    }],
  },
};
