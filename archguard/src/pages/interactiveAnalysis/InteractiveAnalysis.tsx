import React, { useCallback, useState } from "react";
import CoreEditor from "@/pages/interactiveAnalysis/coreEditor/CoreEditor";
import { ExportOutlined, ForwardOutlined, SaveOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { exportDoc } from "@/pages/interactiveAnalysis/helper/exportDoc";
import {
  InteractiveAnalysisContext,
  InteractiveAnalysisTheme,
} from "@/pages/interactiveAnalysis/InteractiveAnalysisContext";
import { webSocket } from "rxjs/webSocket";
import { ReplService } from "@/pages/interactiveAnalysis/coreEditor/ReplService";
import { WebSocketSubject } from "rxjs/src/internal/observable/dom/WebSocketSubject";
import { BackendAction } from "@/pages/interactiveAnalysis/InteractiveToBackend";

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

Scan 示例：

\`\`\`kotlin
%use archguard

scan("Backend").create()
\`\`\`

Linter 示例（待实现）：

\`\`\`kotlin
%use archguard

linter("Backend").layer()
\`\`\`

  `;

function InteractiveAnalysis() {
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const host = process.env.NODE_ENV !== "production" ? "localhost:8080" : location.host;
  const subject = webSocket(`ws://${host}/ascode`);
  const replService = new ReplService(subject as WebSocketSubject<any>);

  const context: InteractiveAnalysisContext = {
    theme: InteractiveAnalysisTheme.WHITE,
    replService,
  };

  const runAllCell = useCallback(() => {
    setIsRunning(true);
    replService.runAll().subscribe({
      next() {
        setIsRunning(false);
      },
      error() {},
      complete() {},
    });
  }, [setIsRunning]);

  const onClickExport = useCallback(() => {
    let content = value.replaceAll("\\\n", "\n");
    exportDoc(content, "archdoc", "md");
  }, [value]);

  const onClickSave = useCallback(() => {
    setIsSaving(true)
    console.log(value);
    BackendAction.saveCode(value).then(r => {
      setIsSaving(false)
    });
  }, [value, setIsSaving]);

  return (
    <div>
      <div className={"toolbar"}>
        <Space direction="horizontal" size="middle">
          {!isRunning && (
            <Tooltip title="Run all">
              <Button type="primary" icon={<ForwardOutlined />} onClick={runAllCell} disabled={isRunning} />
            </Tooltip>
          )}
          {isRunning && (
            <Tooltip title="Stop">
              <Button type="primary" icon={<StopOutlined />} disabled={true} />
            </Tooltip>
          )}
          <Tooltip title="Export">
            <Button type="primary" icon={<ExportOutlined />} onClick={onClickExport} />
          </Tooltip>
          <Tooltip title="Save">
            <Button type="primary" icon={<SaveOutlined />} onClick={onClickSave} disabled={isSaving}/>
          </Tooltip>
        </Space>
      </div>
      <CoreEditor value={value} context={context} />
    </div>
  );
}

export default InteractiveAnalysis;
