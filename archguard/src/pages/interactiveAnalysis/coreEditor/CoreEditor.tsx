import React from "react";
import BlockEditor from "@/pages/interactiveAnalysis/coreEditor/BlockEditor";

function CoreEditor() {
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

  const testcode = `@file:DependsOn("org.archguard.scanner:doc-executor:2.0.0-alpha.2")

import org.archguard.dsl.*
var layer = layered {
    prefixId("org.archguard")
    component("controller") dependentOn component("service")
    组件("service") 依赖于 组件("repository")
}`

  // todo: parse markdown to dispatch block and graph

  return (<div>
    <BlockEditor language={ "kotlin" } code={ testcode }/>
  </div>)
}

export default CoreEditor;
