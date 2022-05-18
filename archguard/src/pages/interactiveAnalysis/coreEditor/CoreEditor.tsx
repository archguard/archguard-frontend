import React from "react";
import RichMarkdownEditor from "rich-markdown-editor";
import { LivingCodeFenceExtension } from "@/pages/interactiveAnalysis/coreEditor/extension/LivingCodeFenceExtension";
import { LivingCodeBlockExtension } from "@/pages/interactiveAnalysis/coreEditor/extension/LivingCodeBlockExtension";
import { webSocket } from "rxjs/webSocket";

interface CoreEditorProps {
  value: string;
}

function CoreEditor(props: CoreEditorProps) {
  // todo: refactor one socket server
  const subject = webSocket("ws://localhost:8848/");

  function initExtensions() {
    let fenceExtension = new LivingCodeFenceExtension({ websocket: subject });
    let blockExtension = new LivingCodeBlockExtension({ websocket: subject });

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
