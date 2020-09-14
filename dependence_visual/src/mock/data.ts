import { MeasureIndicators } from '@/api/module/codeLine';

export const MockData1 = [
  { badSmell: "体量过大-类较大", category: "体量过大", count: 0 },
  { badSmell: "体量过大-类较大2", category: "体量过大", count: 0 },
  { badSmell: "体量过大-类较大3", category: "体量过大", count: 0 },
  { badSmell: "设计冗余1", category: "设计冗余", count: 28.8 },
  { badSmell: "过高耦合1", category: "过高耦合", count: 39.3 },
  { badSmell: "过低内聚1", category: "过低内聚", count: 21.4 },
  { badSmell: "过于复杂1", category: "过于复杂", count: 47 },
  { badSmell: "缺乏分层1", category: "缺乏分层", count: 20.3 },
  { badSmell: "体量过大2", category: "体量过大", count: 10 },
  { badSmell: "设计冗余2", category: "设计冗余", count: 23.2 },
  { badSmell: "过高耦合2", category: "过高耦合", count: 34.5 },
  { badSmell: "过低内聚2", category: "过低内聚", count: 19.7 },
  { badSmell: "过于复杂2", category: "过于复杂", count: 22.6 },
  { badSmell: "缺乏分层2", category: "缺乏分层", count: 35.5 },
];


export const MockData2: MeasureIndicators[] = [
  {
    groupKey: '团队交付能力',
    groupData: [
      {
        type: '生产发布频率',
        graphData: [
          {
            value: 1,
            date: '09-01'
          },
          {
            value: 2,
            date: '09-02'
          },
        ]
      },
      {
        type: '需求前置时间LeadTime',
        graphData: [
          {
            value: 1,
            date: '09-01'
          },
          {
            value: 2,
            date: '09-02'
          },
        ]
      },
    ]
  },
  {
    groupKey: '流程优化能力',
    groupData: [
      {
        type: '流动效率',
        graphData: [
          {
            value: 1,
            date: '09-01'
          },
          {
            value: 2,
            date: '09-02'
          },
        ]
      },
      {
        type: '版本范围偏差率',
        graphData: [
          {
            value: 1,
            date: '09-01'
          },
          {
            value: 2,
            date: '09-02'
          },
        ]
      },
    ]
  },
];
