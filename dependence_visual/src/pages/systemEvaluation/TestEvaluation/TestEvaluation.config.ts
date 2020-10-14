import {
  classColumnRenderAsLink,
  methodColumnRenderAsLink,
} from "@/components/Business/IssuesList/ColumnRenderUtils";
import { IssuesConfig } from "@/components/Business/IssuesList/IssuesList";
import { baseURL } from "@/api/module/config";

const tab = {
  sleepTest: "包含休眠的测试",
  ignore: "被忽略的测试",
  unAssert: "缺乏校验的测试",
  duplicateAssert: "包含繁杂判断的测试",
  redundantPrint: "包含冗余打印的测试",
  staticMethod: "静态方法",
} as const;

export const config: Record<keyof typeof tab, IssuesConfig> = {

  sleepTest: {
    title: tab.sleepTest,
    badSmellDescription:
      "测试用例中包含 Sleep 休眠语句，常见于异步测试场景，或为了规避不同测试用例中某些操作的依赖和冲突。",
    suggestion: `如 Robert C. Martin 在《代码整洁之道》所说的那样，好的测试应该是快速（Fast）、独立（Indendent）、可重复（Repeatable）、自足验证（Self-Validating）、及时（Timely）的
  · 测试用例本身编写时，应该注意保持独立性，不同用例之前不要产生互相依赖、等待，尤其是不同用例使用的测试数据应该独立。
  · 当处理异步测试场景时，建议使用 CompletableFuture 配合 CountDownLatch 的方式进行，从而不用硬编码休眠的时长。`,
    tableConfigs: [
      {
        dataUrl: baseURL + "/test-bad-smell/sleep-test-methods",
        title: () => "包含Sleep休眠语句的测试用例列表",
        columns: [
          {
            title: "模块",
            dataIndex: "moduleName",
            key: "moduleName",
          },
          {
            title: "包",
            dataIndex: "packageName",
            key: "packageName",
          },
          {
            title: "类",
            dataIndex: "typeName",
            key: "typeName",
            render: classColumnRenderAsLink,
          },
          {
            title: "方法",
            dataIndex: "methodName",
            key: "methodName",
            render: methodColumnRenderAsLink,
          },
        ],
      },
    ],
  },
  ignore: {
    title: tab.ignore,
    badSmellDescription: "被忽略（Ignore、Disabled）的测试用例",
    suggestion: `当需求修改导致测试用例失败、失效了，应该尽快修复或移除而不是忽略。`,
    tableConfigs: [
      {
        dataUrl: baseURL + "/test-bad-smell/ignore-test-methods",
        title: () => "被忽略的测试用例列表",
        columns: [
          {
            title: "模块",
            dataIndex: "moduleName",
            key: "moduleName",
          },
          {
            title: "包",
            dataIndex: "packageName",
            key: "packageName",
          },
          {
            title: "类",
            dataIndex: "typeName",
            key: "typeName",
            render: classColumnRenderAsLink,
          },
          {
            title: "方法",
            dataIndex: "methodName",
            key: "methodName",
            render: methodColumnRenderAsLink,
          },
        ],
      },
    ],
  },
  unAssert: {
    title: tab.unAssert,
    badSmellDescription: "缺乏了自动校验的测试用例，这将无法达到自动验证结果的目的。",
    suggestion: `为每个测试用例都添加足够的自动校验 Assert 语句`,
    tableConfigs: [
      {
        dataUrl: baseURL + "/test-bad-smell/unassert-test-methods",
        title: () => "问题列表",
        columns: [
          {
            title: "模块",
            dataIndex: "moduleName",
            key: "moduleName",
          },
          {
            title: "包",
            dataIndex: "packageName",
            key: "packageName",
          },
          {
            title: "类",
            dataIndex: "typeName",
            key: "typeName",
            render: classColumnRenderAsLink,
          },
          {
            title: "方法",
            dataIndex: "methodName",
            key: "methodName",
            render: methodColumnRenderAsLink,
          },
        ],
      },
    ],
  },
  duplicateAssert: {
    title: tab.duplicateAssert,
    badSmellDescription: "包含了过多 Assert 语句的测试用例",
    suggestion: `建议每个测试用例聚焦于一个测试场景和目的，不要企图编写一个各种场景面面俱到的巨无霸测试，这将让后期的维护更加困难`,
    tableConfigs: [
      {
        dataUrl: baseURL + "/test-bad-smell/multi-assert-test-methods",
        title: () => "包含繁杂Assert判断（如超过12个assert)的测试用例列表",
        columns: [
          {
            title: "模块",
            dataIndex: "moduleName",
            key: "moduleName",
          },
          {
            title: "包",
            dataIndex: "packageName",
            key: "packageName",
          },
          {
            title: "类",
            dataIndex: "typeName",
            key: "typeName",
            render: classColumnRenderAsLink,
          },
          {
            title: "方法",
            dataIndex: "methodName",
            key: "methodName",
            render: methodColumnRenderAsLink,
          },
        ],
      },
    ],
  },
  redundantPrint: {
    title: tab.redundantPrint,
    badSmellDescription: "包含了过多调试打印信息的测试用例",
    suggestion: `自动化测试用例中，应该使用自动的 Assert 语句，替代需要人眼观察的 Print`,
    tableConfigs: [
      {
        dataUrl: baseURL + "/test-bad-smell/redundant-print-test-methods",
        title: () => "包含了过多调用打印信息(超过12个print语句)的测试用例",
        columns: [
          {
            title: "模块",
            dataIndex: "moduleName",
            key: "moduleName",
          },
          {
            title: "包",
            dataIndex: "packageName",
            key: "packageName",
          },
          {
            title: "类",
            dataIndex: "typeName",
            key: "typeName",
            render: classColumnRenderAsLink,
          },
          {
            title: "方法",
            dataIndex: "methodName",
            key: "methodName",
            render: methodColumnRenderAsLink,
          },
        ],
      },
    ],
  },
  staticMethod: {
    title: tab.staticMethod,
    badSmellDescription:
      "静态方法本身并没有问题，但当方法被定义为静态之后，尤其当方法里面还涉及外部依赖的时候，我们就需要花更多的时间、手段才能为它们构建测试替身从而进行单元测试，从而影响了后续添加测试的效率；那些能支持静态方法替身的测试库往往运行效率也比较低。",
    suggestion: `避免把涉及外部依赖（如三方服务调用、基础设施调用等）的代码放在静态方法里，如果静态方法里面只是某些固定的算法或转换逻辑，那我们后续添加测试的时候就不一定需要为它们添加测试替身。`,
    tableConfigs: [
      {
        title: () => "静态方法列表",
        dataUrl: baseURL + "/test-bad-smell/static-methods",
        columns: [
          {
            title: "模块",
            dataIndex: "moduleName",
            key: "moduleName",
          },
          {
            title: "包",
            dataIndex: "packageName",
            key: "packageName",
          },
          {
            title: "类",
            dataIndex: "typeName",
            key: "typeName",
            render: classColumnRenderAsLink,
          },
          {
            title: "方法",
            dataIndex: "methodName",
            key: "methodName",
            render: methodColumnRenderAsLink,
          },
        ],
      },
    ],
  },
};
