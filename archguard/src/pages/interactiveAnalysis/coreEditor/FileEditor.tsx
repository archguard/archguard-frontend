import React, { useCallback, useState } from "react";
import BlockEditor from "@/pages/interactiveAnalysis/coreEditor/BlockEditor";
import { webSocket } from "rxjs/webSocket";

function FileEditor() {
  const [result, setResult] = useState(null)
  const testcode = `@file:DependsOn("org.archguard.scanner:doc-executor:2.0.0-alpha.2")

import org.archguard.dsl.*
var layer = layered {
    prefixId("org.archguard")
    component("controller") dependentOn component("service")
    组件("service") 依赖于 组件("repository")
}`

  // todo: parse markdown to dispatch block and graph

  const subject = webSocket('ws://localhost:8848/');

  const runCode = useCallback((code) => {
    subject.subscribe({
      next: (msg) => {
        console.log(msg)
        setResult(msg)
      }, // Called whenever there is a message from the server.
      error: (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log("complete"), // Called when connection is closed (for whatever reason).
    });

    subject.next({ code: code });
  }, setResult);

  return (<div>
    <BlockEditor language={ "kotlin" } code={ testcode } evalCode={ runCode }/>
    <div>{ result }</div>
  </div>)
}

export default FileEditor;
