export const map = {
  changeImpactReportDetail: "变更影响",
  moduleCouplingReportDetail: "模块耦合",
  testProtectionReportDetail: "测试保护",
  scatteredPercent: "散弹式提交百分比",
  scatteredCommits: "近三个月的散弹式提交的commit",
  scatteredCommit: "散弹式提交",
  allCommits: "近三个月的所有提交信息",
  moduleInstabilityAverage: "热点模块平均不稳定性指数",
  count8: "超过 80% 的不稳定性模块个数",
  count8To6: "60%-80% 的不稳定性模块个数",
  count6: "低于60%的不稳定性模块个数",
  latestQualityList: "模块的耦合详细列表数据",
  uselessTest: "无用测试个数",
  latestUselessTest: "最近100次提交的无用测试个数",
  uselessPercent: "无用测试比例",
  UselessTestPercent: "无用测试比例",
  latestTestCoverage: "核心类测试覆盖率",
  latestModuleTestCoverage: "热点模块测试覆盖率",
  testCoverage: "核心类有效测试覆盖率",
  modelCoverage: "热点模块有效测试覆盖率",
  testBs: "TestBadSmell列表",
  totalTest: "总测试个数",
  hotSpotTest: "热点测试列表",
  hotSpotTestBadSmell: "热点TestBadSmell",
  classCoverageByFiles: "核心类的覆盖率列表",
  hotSpotFile: "热点文件",
  classCoverageByModules: "热点模块的覆盖率列表",
  hotSpotModule: "热点模块",
  LatestModuleInstability:"热点模块不稳定性",
};

const transformedMap = {};
for (let key in map) {
  transformedMap[key.toLowerCase()] = map[key];
}

export function mapToLabel(s) {
  return transformedMap[s.toLowerCase()] || s;
}
