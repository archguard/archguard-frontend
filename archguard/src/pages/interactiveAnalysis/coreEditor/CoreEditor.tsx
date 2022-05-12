import React  from "react";
import { useIntl } from 'umi';
import Editor from "@monaco-editor/react";

function CoreEditor() {
  const { formatMessage } = useIntl();

  const code = `
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

  return (<div>
    <Editor
      height="90vh"
      defaultLanguage="markdown"
      defaultValue={ code }
    />
  </div>)
}

export default CoreEditor;
