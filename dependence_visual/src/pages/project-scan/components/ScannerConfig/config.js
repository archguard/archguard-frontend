export const scanTools = {
  BadSmell: {
    integration: ["Coca", "DesignateJava"],
    introduction: `检测出代码中的坏味道
    17种设计坏味道
    - Imperative Abstraction
    - Multifaceted Abstraction
    - Unnecessary Abstraction
    - Unutilized Abstraction
    - Deficient Encapsulation
    - Unexploited Encapsulation
    - Broken Modularization
    - Cyclic-Dependent Modularization
    - Insufficient Modularization
    - Hub-like Modularization
    - Broken Hierarchy
    - Cyclic Hierarchy
    - Deep Hierarchy
    - Missing Hierarchy
    - Multipath Hierarchy
    - Rebellious Hierarchy
    - Wide Hierarchy
    10种实现坏味道
    - Abstract Function Call From Constructor
    - Complex Conditional
    - Complex Method
    - Empty catch clause
    - Long Identifier
    - Long Method
    - Long Parameter List
    - Long Statement
    - Magic Number
    - Missing default"`,
  },
  Jacoco: {
    integration: ["Jacoco"],
    introduction: `多种尺度的覆盖率计数器，包括：
    - Instructions
    - Branches
    - Lines
    - non-abstract methods
    - classes
    - CyclomaticComplexity`,
  },
  TestBadSmell: {
    integration: ["Coca"],
    introduction: `检测出测试中的坏味道
    - IgnoreTest: @Ingore
    - EmptyTest: not call in test
    - RedundantPrintTest: system.out.println
    - SleepyTest: Time.sleep
    - RedundantAssertionTest: assertTrue(True)
    - UnknownTest: not assert
    - DuplicateAssertTest: assert > 5
    - TestersOnly: method only call by test
    - CrossBorderTest: test method which not in system
    - General Fixture: JUnit classes having at least one method not using the entire test fixture defined in the setUp() method`,
  },
  CheckStyle: {
    integration: ["CheckStyle"],
    introduction: `通过指定规则，检查代码规范。`,
    configuration: ["checkstyle.xml配置文件地址"],
  },
  Statistic: {
    integration: ["DesignnateJava"],
    introduction: `计算面向对象指标：
    - LOC (Lines Of Code - at method and class granularity)
    - CC (Cyclomatic Complexity - Method)
    - PC (Parameter Count - Method)
    - NOF (Number of Fields - Class)
    - NOPF (Number of Public Fields - Class)
    - NOM (Number of Methods - Class)
    - NOPM (Number of Public Methods - Class)
    - WMC (Weighted Methods per Class - Class)
    - NC (Number of Children - Class)
    - DIT (Depth of Inheritance Tree - Class)
    - LCOM (Lack of Cohesion in Methods - Class)
    - FANIN (Fan-in - Class)
    - FANOUT (Fan-out - Class)`,
  },
  GitSource: {
    integration: ["自研 git 扫描器"],
    introduction: `热点文件
    散弹式提交`,
  },
  pmd: {
    integration: ["PMD"],
    introduction: `PMD是一个开源的静态源代码分析器，它报告在应用程序代码中发现的问题。
    包含内置规则集，并支持编写自定义规则的功能。`,
  },
};
