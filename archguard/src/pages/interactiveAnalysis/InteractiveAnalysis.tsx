import React, { useCallback, useEffect, useState } from "react";
import CoreEditor from "@/pages/interactiveAnalysis/coreEditor/CoreEditor";
import {
  ExportOutlined,
  ForwardOutlined,
  ImportOutlined,
  SaveOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Tooltip } from "antd";
import RichMarkdownEditor from "rich-markdown-editor";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { unified } from "unified";
import copy from "copy-to-clipboard";

import { exportDoc } from "@/pages/interactiveAnalysis/helper/exportDoc";
import {
  InteractiveAnalysisContext,
  InteractiveAnalysisTheme,
} from "@/pages/interactiveAnalysis/InteractiveAnalysisContext";
import { webSocket } from "rxjs/webSocket";
import { ReplService } from "@/pages/interactiveAnalysis/coreEditor/ReplService";
import { WebSocketSubject } from "rxjs/src/internal/observable/dom/WebSocketSubject";
import { BackendAction } from "@/pages/interactiveAnalysis/InteractiveToBackend";

const defaultValue = `

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

function markdownToDsl(rootnode: Node) {
  let repos = [];
  if (rootnode["children"]) {
    for (let child of rootnode["children"]) {
      switch (child.type) {
        case "table":
          // eslint-disable-next-line no-case-declarations
          const table = [];
          for (let row of child["children"]) {
            let newRow = [];
            for (let cell of row["children"]) {
              console.log(cell);
              let text = "";
              let firstEl = cell["children"][0];
              switch (firstEl.type) {
                case "text":
                  text = firstEl.value;
                  break;
                case "link":
                  text = firstEl.url;
                  break;
              }

              newRow.push(text);
            }
            table.push(newRow);
          }

          // eslint-disable-next-line no-case-declarations
          const header = table.shift();
          for (let row of table) {
            let repoEl = [];
            for (let index in row) {
              repoEl.push(`${header[index]}="${row[index]}"`);
            }
            repos.push("repo(" + repoEl.join(",") + ")");
          }
          break;
        default:
          console.log(rootnode.type);
      }
    }
  }

  return repos;
}

function InteractiveAnalysis() {
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const host = process.env.NODE_ENV !== "production" ? "localhost:8080" : location.host;
  const subject = webSocket(`ws://${host}/ascode`);
  const [value, setValue] = useState('' as string);
  const [visible, setVisible] = useState(false);
  const [importText, setImportText] = useState("");

  const [replService] = useState(new ReplService(subject as WebSocketSubject<any>));

  const context: InteractiveAnalysisContext = {
    theme: InteractiveAnalysisTheme.WHITE,
    replService: replService,
  };

  useEffect(() => {
    BackendAction.loadCode().then((code) => {
      if (code.content && code.content.length > 0) {
        setValue(code.content);
      } else {
        setValue(defaultValue);
      }
    }).catch(() => {
      setValue(defaultValue);
    }).finally(() => {

    })
  }, [setValue])

  const runAllCell = useCallback(() => {
    setIsRunning(true);
    replService.runAll().subscribe({
      next() {
        setIsRunning(false);
      },
      error(err) {
        console.error(err)
      },
      complete() {
        console.error('runAllCell: complete')
      },
    });
  }, [setIsRunning, replService]);

  const onClickExport = useCallback(() => {
    let content = value.replaceAll("\\\n", "\n");
    exportDoc(content, "archdoc", "md");
  }, [value]);

  const onClickSave = useCallback(() => {
    setIsSaving(true);
    BackendAction.saveCode(value).then((r) => {
      setIsSaving(false);
    });
  }, [value, setIsSaving]);

  const changeValue = useCallback((text: string) => {
    setValue(text);
  }, [setValue]);

  const onSave = useCallback((text: string) => {
    setIsSaving(true);
    BackendAction.saveCode(text).then((r) => {
      setIsSaving(false);
    });
  }, [setValue]);

  const onClickImport = useCallback(() => {
    setVisible(true)
  }, [setVisible]);

  const changeImportValue = useCallback((value: () => string) => {
    let val = value();
    setImportText(val.replaceAll("\\\n", "\n"));
  }, []);

  const copyToDsl = useCallback(() =>{
    setVisible(false)

    let rootnode = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .parse(importText);

    let repos = markdownToDsl(rootnode as Node);
    let dsl = `repos {
  ${repos.join("\n")}
}`;

    console.log(dsl)
    copy(dsl)

  }, [importText, setVisible])

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
          <Tooltip title="Multiple System Import">
            <Button type="primary" icon={<ImportOutlined />} onClick={onClickImport} />
          </Tooltip>
        </Space>
      </div>
      { value.length > 0 && <CoreEditor value={value} context={context} onSave={onSave} onChange={changeValue}/> }

      <Modal
        title="Import systems"
        centered
        visible={visible}
        onOk={copyToDsl}
        okText={"to DSL"}
        onCancel={() => setVisible(false)}
        width={1000}
        height={500}
      >
        <RichMarkdownEditor
          defaultValue={
`| name | scmUrl | language | branch |
|-------|-------|---------|-------|
| DDD Mono | https://github.com/archguard/ddd-monolithic-code-sample | Java | master |
`}
          onChange={changeImportValue}
        />
      </Modal>
    </div>
  );
}

export default InteractiveAnalysis;
