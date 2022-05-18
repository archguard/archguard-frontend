import React, { useCallback } from "react";
import CoreEditor from "@/pages/interactiveAnalysis/coreEditor/CoreEditor";
import { CaretRightOutlined, ForwardOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

function InteractiveAnalysis() {
  const value = `
## ArchGuard DSL

目标：基于 ArchGuard Backend，提供 CRUD 封装的 API，如构建系统，查询依赖关系等。

\`\`\`kotlin
repos {
    repo(name = "Backend", language = "Kotlin", scmUrl = "https://github.com/archguard/archguard")
    repo(name = "Scanner", language = "Kotlin", scmUrl = "https://github.com/archguard/scanner")
}
\`\`\`

## Architecture DSL

目标：设计系统架构，可视化架构设计等，生成系统的架构 DSL。

\`\`\`kotlin
@file:DependsOn("org.archguard.scanner:doc-executor:2.0.0-alpha.6")
import org.archguard.dsl.*

val layer = layered {
    prefixId("org.archguard")
    component("interface") dependentOn component("application")
    component("interface") dependentOn component("domain")
    component("interface") dependentOn component("infrastructure")
    component("application") dependentOn component("domain")
    component("application") dependentOn component("infrastructure")
    component("domain") dependentOn component("infrastructure")
}

graph().show(layer.relations())
\`\`\`

## Analyser/Scanner/Linter DSL

目标：结合 ArchGuard Scanner 中的能力，对系统进行 Scanner、Analyser、Linter 等。

\`\`\`kotlin
linter("Backend").layer()
\`\`\`

  `;

  const runAll = useCallback(() => {

  }, []);

  const save = useCallback(() => {

  }, []);

  return (<div>
    <div className={"toolbar"}>
      <Space direction="horizontal" size="middle">
        <Tooltip title="Save"><Button type="primary" icon={ <SaveOutlined /> } onClick={ save } /></Tooltip>
        <Tooltip title="Run all"><Button type="primary" icon={ <ForwardOutlined /> } onClick={ runAll } /></Tooltip>
      </Space>
    </div>
    <CoreEditor value={value} />
  </div>)
}

export default InteractiveAnalysis;
