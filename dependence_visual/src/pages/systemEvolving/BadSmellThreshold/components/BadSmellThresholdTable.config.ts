export const BadSmellThresholdTableColumns = [
  {
    title: "评估维度",
    dataIndex: "dimension",
    key: "dimension",
  },
  {
    title: "坏味道",
    dataIndex: "badSmell",
    key: "badSmell",
  },
  {
    title: "判断条件",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "指标阈值",
    dataIndex: "threshold",
    key: "threshold",
  },
];

export const BadSmellThresholdTableData = [
  {
    key: "oversizedMethodByLine",
    dimension: "体量维度",
    badSmell: "过大的方法",
    description: "方法代码行数 > 指标阈值",
    threshold: 30,
  },
  {
    key: "oversizedMethodByCount",
    dimension: "体量维度",
    badSmell: "过大的方法",
    description: "方法个数 > 指标阈值",
    threshold: 20,
  },
  {
    key: "oversizedClassByLine",
    dimension: "体量维度",
    badSmell: "过大的类",
    description: "类代码行数 > 指标阈值",
    threshold: 600,
  },
  {
    key: "oversizedClassByCount",
    dimension: "体量维度",
    badSmell: "过大的类",
    description: "类个数 > 指标阈值",
    threshold: 20,
  },
  {
    key: "oversizedPackageByLine",
    dimension: "体量维度",
    badSmell: "过大的包",
    description: "包代码行数 > 指标阈值",
    threshold: 12000,
  },
  {
    key: "oversizedPackageByCount",
    dimension: "体量维度",
    badSmell: "过大的包",
    description: "包的个数 > 指标阈值",
    threshold: 20,
  },
];
