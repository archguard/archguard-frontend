import { IssuesConfig } from '@/components/Business/IssuesList/IssuesList';
import { baseURL } from '@/api/module/config';
import { methodColumns } from '@/pages/SizingEvaluation/SizingEvaluationTableColumn.config';

export const RedundancyConfig: { [key: string]: IssuesConfig; } = {
  element: {
    title: '冗余元素',
    badSmellDescription: '冗余元素 badSmellDescription',
    suggestion: '冗余元素 suggestion',
    tableConfigs: [
      {
        title: '只有一个方法的类的列表',
        dataUrl: baseURL + "/sizing/methods/above-threshold",
        columns: [
          {
            title: '模块',
            dataIndex: 'moduleName',
            key: 'moduleName',
          }
        ],
      },
      {
        title: '只包含一个属性及get/set的类列表',
        dataUrl: baseURL + "/sizing/methods/above-threshold",
        columns: [
          {
            title: '模块',
            dataIndex: 'moduleName',
            key: 'moduleName',
          }
        ],
      },
    ]
  }
};
