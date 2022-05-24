import React from "react";
import RichMarkdownEditor from "rich-markdown-editor";
import { webSocket } from "rxjs/webSocket";

import { LivingCodeFenceExtension } from "@/pages/interactiveAnalysis/coreEditor/extension/LivingCodeFenceExtension";
import { LivingCodeBlockExtension } from "@/pages/interactiveAnalysis/coreEditor/extension/LivingCodeBlockExtension";
import { InteractiveAnalysisContext } from "@/pages/interactiveAnalysis/InteractiveAnalysisContext";

interface CoreEditorProps {
  value: string;
  context: InteractiveAnalysisContext;
}

function CoreEditor(props: CoreEditorProps) {
  // todo: refactor one socket server
  const subject = webSocket("ws://localhost:8848/");

  function initExtensions() {
    let fenceExtension = new LivingCodeFenceExtension({ websocket: subject, context: props.context });
    let blockExtension = new LivingCodeBlockExtension({ websocket: subject, context: props.context });

    return [fenceExtension, blockExtension];
  }

  return (
    <div>
      <RichMarkdownEditor
        disableExtensions={["code_block", "code_fence"]}
        extensions={initExtensions()}
        value={props.value}
      />
    </div>
  );
}

export default CoreEditor;
