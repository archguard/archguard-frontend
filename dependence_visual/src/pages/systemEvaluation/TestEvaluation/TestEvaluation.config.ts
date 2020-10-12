import { classColumnRenderAsLink, methodColumnRenderAsLink } from '@/components/Business/IssuesList/ColumnRenderUtils';
import { IssuesConfig } from "@/components/Business/IssuesList/IssuesList";
import { baseURL } from "@/api/module/config";

export const config: Record<'staticMethod' | 'sleepTest', IssuesConfig> = {
  staticMethod: {
    title: "静态方法",
    badSmellDescription: "静态方法",
    suggestion: `静态方法`,
    tableConfigs: [
      {
        title: "问题列表（代码行数 > 30行的方法）",
        dataUrl: baseURL + '/test-bad-smell/static-methods',
        columns: [
          {
            title: '模块',
            dataIndex: 'moduleName',
            key: 'moduleName',
          }, {
            title: '包',
            dataIndex: 'packageName',
            key: 'packageName',
          }, {
            title: '类',
            dataIndex: 'typeName',
            key: 'typeName',
            render: classColumnRenderAsLink,
          }, {
            title: '方法',
            dataIndex: 'methodName',
            key: 'methodName',
            render: methodColumnRenderAsLink,
          }, {
            title: '代码行数',
            dataIndex: 'lines',
            key: 'lines',
          }
        ],
      },
    ],

  },
  sleepTest: {
    title: "sleepTest",
    badSmellDescription: "sleepTest",
    suggestion: `sleepTest`,
    tableConfigs: [
      {
        dataUrl: baseURL + '/test-bad-smell/sleep-test-methods',
        title: "问题列表（代码行数 > 30行的方法）",
        columns: [
          {
            title: '模块',
            dataIndex: 'moduleName',
            key: 'moduleName',
          }, {
            title: '包',
            dataIndex: 'packageName',
            key: 'packageName',
          }, {
            title: '类',
            dataIndex: 'typeName',
            key: 'typeName',
            render: classColumnRenderAsLink,
          }, {
            title: '方法',
            dataIndex: 'methodName',
            key: 'methodName',
            render: methodColumnRenderAsLink,
          }, {
            title: '代码行数',
            dataIndex: 'lines',
            key: 'lines',
          }
        ],
      },
    ],

  },
};