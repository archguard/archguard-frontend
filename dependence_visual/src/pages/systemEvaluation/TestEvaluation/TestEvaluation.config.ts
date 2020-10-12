import { classColumnRenderAsLink, methodColumnRenderAsLink } from '@/components/Business/IssuesList/ColumnRenderUtils';
import { IssuesConfig } from "@/components/Business/IssuesList/IssuesList";
import { baseURL } from "@/api/module/config";

const tab = {
  staticMethod: '静态方法',
  sleepTest: 'sleepTest',
  duplicateAssert: '繁杂判断',
  redundantPrint: '冗余打印',
  ignore: '被忽略的测试',
  empty: '空的测试',
  unAssert: '没有自动校验的测试',
} as const;

export const config: Record<keyof typeof tab, IssuesConfig> = {
  staticMethod: {
    title: tab.staticMethod,
    badSmellDescription: "静态方法",
    suggestion: `静态方法`,
    tableConfigs: [
      {
        title: "问题列表",
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
    title: tab.sleepTest,
    badSmellDescription: "sleepTest",
    suggestion: `sleepTest`,
    tableConfigs: [
      {
        dataUrl: baseURL + '/test-bad-smell/sleep-test-methods',
        title: "问题列表",
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
  duplicateAssert: {
    title: tab.duplicateAssert,
    badSmellDescription: "繁杂判断",
    suggestion: `繁杂判断`,
    tableConfigs: [
      {
        dataUrl: baseURL + '/test-bad-smell/multi-assert-test-methods',
        title: "问题列表",
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
  redundantPrint: {
    title: tab.redundantPrint,
    badSmellDescription: "冗余打印",
    suggestion: `冗余打印`,
    tableConfigs: [
      {
        dataUrl: baseURL + '/test-bad-smell/redundant-print-test-methods',
        title: "问题列表",
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
  ignore: {
    title: tab.ignore,
    badSmellDescription: "被忽略的测试",
    suggestion: `被忽略的测试`,
    tableConfigs: [
      {
        dataUrl: baseURL + '/test-bad-smell/ignore-test-methods',
        title: "问题列表",
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
  empty: {
    title: tab.empty,
    badSmellDescription: "空的测试",
    suggestion: `空的测试`,
    tableConfigs: [
      {
        dataUrl: baseURL + '/test-bad-smell/empty-test-methods',
        title: "问题列表",
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
  unAssert: {
    title: tab.unAssert,
    badSmellDescription: "没有自动校验的测试",
    suggestion: `没有自动校验的测试`,
    tableConfigs: [
      {
        dataUrl: baseURL + '/test-bad-smell/unassert-test-methods',
        title: "问题列表",
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
  }
};