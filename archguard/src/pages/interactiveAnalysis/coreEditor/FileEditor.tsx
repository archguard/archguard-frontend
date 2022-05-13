import React, { useCallback, useState, useEffect } from "react";
import BlockEditor from "@/pages/interactiveAnalysis/coreEditor/BlockEditor";
import { createMessage } from "@nteract/messaging";
import jmp from "jmp";
import { createMainChannel } from "enchannel-zmq-backend";

function FileEditor() {
  const [channels, setChannels] = useState(null)
  const all = `
# 架构

\`\`\`kotlin
@file:DependsOn("org.archguard.scanner:doc-executor:2.0.0-alpha.2")

import org.archguard.dsl.*
var layer = layered {
    prefixId("org.archguard")
    component("controller") dependentOn component("service")
    组件("service") 依赖于 组件("repository")
}
\`\`\`
  `

  const config = {
    "control_port": 50160,
    "shell_port": 57503,
    "transport": "tcp",
    "signature_scheme": "hmac-sha256",
    "stdin_port": 52597,
    "hb_port": 42540,
    "ip": "127.0.0.1",
    "iopub_port": 40885,
    "key": "a0436f6c-1916-498b-8eb9-e81ab9368e84"
  }
  useEffect(() => {
    createChannel()
  }, [setChannels])

  const createChannel = async () => {
    const mainChannel = await createMainChannel(
      config,
      undefined,
      undefined,
      undefined,
      jmp
    );

    setChannels(mainChannel)
  }

  const testcode = `@file:DependsOn("org.archguard.scanner:doc-executor:2.0.0-alpha.2")

import org.archguard.dsl.*
var layer = layered {
    prefixId("org.archguard")
    component("controller") dependentOn component("service")
    组件("service") 依赖于 组件("repository")
}`

  // todo: parse markdown to dispatch block and graph

  const runCode = useCallback((code) => {
    console.log(channels)

    const message = createMessage("inspect_request", {
      code: "string.for",
      cursor_pos: 10,
      detail_level: 1
    });
  });


  return (<div>
    <BlockEditor language={ "kotlin" } code={ testcode } run={ runCode }/>
  </div>)
}

export default FileEditor;
