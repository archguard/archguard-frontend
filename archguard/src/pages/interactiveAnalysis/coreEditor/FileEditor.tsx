import React, { useCallback, useState } from "react";
import BlockEditor from "@/pages/interactiveAnalysis/coreEditor/BlockEditor";
import { webSocket } from "rxjs/webSocket";
import Mermaid from "@/pages/interactiveAnalysis/block/Mermaid";
import mermaid from "@/pages/interactiveAnalysis/block/Mermaid";
import mermaidWrapper from "@/pages/interactiveAnalysis/block/mermaidWrapper";

function FileEditor() {
  const [result, setResult] = useState(null);
  const testcode = `@file:DependsOn("org.archguard.scanner:doc-executor:2.0.0-alpha.3")

import org.archguard.dsl.*
var layer = layered {
    prefixId("org.archguard")
    component("controller") dependentOn component("service")
    组件("service") 依赖于 组件("repository")
}

graph().show(layer)
`;

  // todo: parse markdown to dispatch block and block

  const subject = webSocket("ws://localhost:8848/");

  const runCode = useCallback(
    (code) => {
      subject.subscribe({
        next: (msg) => {
          console.log(msg);
          setResult(msg);
        }, // Called whenever there is a message from the server.
        error: (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        complete: () => console.log("complete"), // Called when connection is closed (for whatever reason).
      });

      subject.next({ code: code });
    },
    [setResult],
  );

  return (
    <div>
      <BlockEditor language={"kotlin"} code={testcode} evalCode={runCode} />
      <div>{result}</div>
      <div>
        {mermaidWrapper.mermaid({
          node: {
            key: "mermaid",
            definition: `graph TD;
    A-->B;
    A-->C;
    B-->D;`,
          },
        })}
      </div>
    </div>
  );
}

export default FileEditor;
