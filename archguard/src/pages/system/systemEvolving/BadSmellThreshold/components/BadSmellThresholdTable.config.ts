export interface BadSmellTableData {
  key?: string;
  dimension: string;
  badSmell: string;
  condition: string;
  threshold: number;
  rowspan?: number;
}

export const BadSmellThresholdTableColumns = [
  {
    title: "评估维度",
    dataIndex: "dimension",
    key: "dimension",
    render: (text: string, row: BadSmellTableData) => {
      if (row.rowspan !== undefined) {
        return {
          children: text,
          props: {
            rowSpan: row.rowspan,
          },
        };
      }
      return text;
    },
  },
  {
    title: "坏味道",
    dataIndex: "badSmell",
    key: "badSmell",
  },
  {
    title: "判断条件",
    dataIndex: "condition",
    key: "condition",
  },
  {
    title: "指标阈值",
    dataIndex: "threshold",
    key: "threshold",
  },
];

export const BadSmellThresholdTableData = [
  {
    name: "体量维度",
    threshold: [
      {
        name: "过大的方法",
        condition: "方法代码行数 > 指标阈值",
        value: 30,
      },
      {
        name: "过大的方法",
        condition: "方法个数 > 指标阈值",
        value: 20,
      },
    ],
  },
  {
    name: "耦合维度",
    threshold: [
      {
        key: "dataMud",
        name: "数据泥团",
        condition: "缺乏内聚指标LCOM4 > 指标阈值",
        value: 6,
      },
      {
        key: "deepInheritance",
        name: "过深继承",
        condition: "继承深度 > 指标阈值",
        value: 6,
      },
    ],
  },
];
