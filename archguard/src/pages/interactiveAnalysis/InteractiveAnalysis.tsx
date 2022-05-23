import React, { useCallback } from "react";
import CoreEditor from "@/pages/interactiveAnalysis/coreEditor/CoreEditor";
import { ExportOutlined, ForwardOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { exportDoc } from "@/pages/interactiveAnalysis/helper/exportDoc";

function InteractiveAnalysis() {
  const value = `

## 目标架构：Architecture DSL

说明：设计系统架构，可视化架构设计等，生成系统的架构 DSL。

\`\`\`kotlin
%use archguard

val layer = layered {
    prefixId("org.archguard")
    component("interface") dependentOn component("application")
    component("interface") dependentOn component("domain")
    component("interface") dependentOn component("infrastructure")
    component("application") dependentOn component("domain")
    component("application") dependentOn component("infrastructure")
    component("domain") dependentOn component("infrastructure")
}
\`\`\`

Table:

\`\`\`kotlin
layer.relations()
\`\`\`

Graph:

\`\`\`kotlin
diagram().show(layer.relations())
\`\`\`


## 当前/现状架构：ArchGuard DSL

说明：基于 ArchGuard Backend，提供 CRUD 封装的 API，如构建系统，查询依赖关系等。

\`\`\`kotlin
%use archguard

repos {
    repo(name = "Backend", language = "Kotlin", scmUrl = "https://github.com/archguard/archguard")
    repo(name = "Scanner", language = "Kotlin", scmUrl = "https://github.com/archguard/scanner")
}

context.repos.create()
\`\`\`

## 治理架构：Analyser/Scanner/Linter DSL

说明：结合 ArchGuard Scanner 中的能力，对系统进行 Scanner、Analyser、Linter 等。

\`\`\`kotlin
%use archguard

linter("Backend").layer()
\`\`\`

  `;

  const runAllCell = useCallback(() => {

  }, []);

  const save = useCallback(() => {

  }, []);

  const onClickExport = useCallback(() => {
    let content = value.replaceAll("\\\n", "\n");
    exportDoc(content, "archdoc", "md")
  }, [value]);

  return (<div>
    <div className={"toolbar"}>
      <Space direction="horizontal" size="middle">
        <Tooltip title="Save"><Button type="primary" icon={ <SaveOutlined /> } onClick={ save } /></Tooltip>
        <Tooltip title="Run all"><Button type="primary" icon={ <ForwardOutlined /> } onClick={ runAllCell } /></Tooltip>
        <Tooltip title="Export"><Button type="primary" icon={ <ExportOutlined /> } onClick={ onClickExport } /></Tooltip>
      </Space>
    </div>
    <CoreEditor value={value} />
  </div>)
}

export default InteractiveAnalysis;
