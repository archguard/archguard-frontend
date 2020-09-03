export const IssuesAndSuggestion = {
  METHOD: {
    title: '过大的方法（Method）',
    badSmellDescription: '一个方法含有太多行代码。一般来说，任何方法超过 10 行时，你就可以考虑是不是过长了。',
    suggestion: '拆分方法，寻找长方法内部的代码边界并将其逐一抽取为私有方法。寻找代码边界的关键：找循环，找判断，找注释，找重复代码。另，在拆分方法改造时，应注意测试保护，尽可能先为原方法添加相应的单元测试/集成测试案例。并且，充分使用编辑器内置的重构菜单进行自动重构（如Intellij的Refactor-> Extract Method)，从而避免人手操作导致的失误。',
  },
}
