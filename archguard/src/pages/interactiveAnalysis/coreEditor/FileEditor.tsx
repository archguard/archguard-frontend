import React, { useCallback, useState } from "react";
import BlockEditor from "@/pages/interactiveAnalysis/coreEditor/BlockEditor";
import { webSocket } from "rxjs/webSocket";
import mermaidWrapper from "@/pages/interactiveAnalysis/block/mermaidWrapper";

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

function FileEditor() {
  const [result, setResult] = useState({} as ReplResult);
  const testcode = `@file:DependsOn("org.archguard.scanner:doc-executor:2.0.0-alpha.5")

import org.archguard.dsl.*
var layer = layered {
    prefixId("org.archguard")
    component("controller") dependentOn component("service")
    组件("service") 依赖于 组件("repository")
}

graph().show(layer.relations())
`;

  // todo: parse markdown to dispatch block and block

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
    let data = JSON.parse(dataStr)

    let def = "";
    for (let datum of data) {
      def += datum.source + "-->" + datum.target + ";\n";
    }

    return (
      <>
        { mermaidWrapper.mermaid({
          node: {
            key: "mermaid",
            definition: `graph TD;
   ${def}`,
          },
        })}
      </>
    );
  }

  return (
    <div>
      <BlockEditor language={"kotlin"} code={testcode} evalCode={runCode} />
      <div>{JSON.stringify(result)}</div>
      {result.isArchdocApi && result.action.graphType == "archdoc" && (
        <div>{renderGraph(result.action.data)}</div>
      )}
    </div>
  );
}

export default FileEditor;
