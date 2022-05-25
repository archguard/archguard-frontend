import React from "react";
import RichMarkdownEditor from "rich-markdown-editor";
import { webSocket } from "rxjs/webSocket";

import { LivingCodeFenceExtension } from "@/pages/interactiveAnalysis/coreEditor/extension/LivingCodeFenceExtension";
import { LivingCodeBlockExtension } from "@/pages/interactiveAnalysis/coreEditor/extension/LivingCodeBlockExtension";
import { InteractiveAnalysisContext } from "@/pages/interactiveAnalysis/InteractiveAnalysisContext";
import { WebSocketSubject } from "rxjs/src/internal/observable/dom/WebSocketSubject";
import { ReplService } from "@/pages/interactiveAnalysis/coreEditor/ReplService";

interface CoreEditorProps {
  value: string;
  context: InteractiveAnalysisContext;
}

function CoreEditor(props: CoreEditorProps) {
  // todo: refactor one socket server
  const subject = webSocket("ws://localhost:8080/ascode");
  const replService = new ReplService(subject as WebSocketSubject<any>);

  function initExtensions() {
    let fenceExtension = new LivingCodeFenceExtension({ websocket: replService, context: props.context });
    let blockExtension = new LivingCodeBlockExtension({ websocket: replService, context: props.context });

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
