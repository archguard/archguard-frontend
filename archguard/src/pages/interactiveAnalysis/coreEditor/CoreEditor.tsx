import React, { useCallback, useState } from "react";
import { webSocket } from "rxjs/webSocket";
import RichMarkdownEditor from "rich-markdown-editor";
import mermaidWrapper from "@/pages/interactiveAnalysis/block/graph/mermaidWrapper";
import { LivingCodeFenceExtension } from "@/pages/interactiveAnalysis/coreEditor/LivingCodeFenceExtension";
import { LivingCodeBlockExtension } from "@/pages/interactiveAnalysis/coreEditor/LivingCodeBlockExtension";

interface ReactiveAction {
  actionType: string;
  className: string;
  graphType: string;
  data: string;
}

interface ReplResult {
  resultValue: string;
  isArchdocApi: boolean;
  className: string;
  actionData: string;
  action: ReactiveAction;
}

function CoreEditor() {
  const [result, setResult] = useState({} as ReplResult);
  const subject = webSocket("ws://localhost:8848/");

  const runCode = useCallback(
    (code) => {
      subject.subscribe({
        next: (msg) => {
          let result = msg as ReplResult;
          setResult(result as any);
        },
        error: (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        complete: () => console.log("complete"), // Called when connection is closed (for whatever reason).
      });

      subject.next({ code: code });
    },
    [setResult],
  );

  function renderGraph(dataStr: string) {
    let data = JSON.parse(dataStr);

    let def = "";
    for (let datum of data) {
      def += datum.source + "-->" + datum.target + ";\n";
    }

    return (
      <>
        {mermaidWrapper.mermaid({
          node: {
            key: "mermaid",
            definition: `graph TD;
   ${def}`,
          },
        })}
      </>
    );
  }

  const value = `
## Backend DSL

目标：基于 ArchGuard Backend，提供 CRUD 封装的 API，如构建系统，查询依赖关系等。

\`\`\`kotlin
repos {
    repo(name = "Backend", language = "Kotlin", scmUrl = "https://github.com/archguard/archguard")
    repo(name = "Scanner", language = "Kotlin", scmUrl = "https://github.com/archguard/scanner")
}
\`\`\`

## 架构 DSL

目标：设计系统架构，可视化架构设计等，生成系统的架构 DSL。

\`\`\`kotlin
@file:DependsOn("org.archguard.scanner:doc-executor:2.0.0-alpha.6")
import org.archguard.dsl.*

val layer = layered {
    prefixId("org.archguard")
    component("interface") dependentOn component("application")
    组件("interface") 依赖于 组件("domain")
    component("interface") dependentOn component("infrastructure")

    组件("application") 依赖于 组件("domain")
    组件("application") 依赖于 组件("infrastructure")

    组件("domain") 依赖于 组件("infrastructure")
}

graph().show(layer.relations())
\`\`\`

## Scanner DSL

目标：结合 ArchGuard Scanner 中的能力，对系统进行 Scanner、Analyser、Linter 等。

\`\`\`kotlin
linter("Backend").layer()
\`\`\`

  `

  return (
    <div>
      <RichMarkdownEditor
        disableExtensions={["code_block", "code_fence"]}
        extensions={[new LivingCodeFenceExtension(), new LivingCodeBlockExtension()]}
        value={value}
        />
    </div>
  );
}

export default CoreEditor;
