const dimensionsType = [
  "测试保护",
  "模块耦合",
  "变更影响",
  "代码规范",
  "分层架构",
  "数据库耦合",
];

export const response = {
  id: "420bd34f-cf86-4102-8fbd-74ead14cae4b",
  createdDate: "2020-04-27T09:22:47",
  name: "质量评估",
  dimensions: dimensionsType.map((item) => ({
    name: item,
    reportDms: {
      LatestModuleTestCoverage: "NEED_IMPROVED",
      UselessTestPercent: "GOOD",
    },
  })),
  comment: "质量考虑，系统方面做的不错，测试保护方面有待提升",
  improvements: [
    "热点模块测试覆盖率是有NaN，且存在0个无效测试，对于热点模块，自动化测试不足，可能出现核心功能业务Bug。",
    "系统存无效测试占比0.068330，这些测试不能有效显示功能是否遭到破坏，易误导测试人员，出现少测，漏侧现象。",
  ],
};

export default response;
