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
  function initExtensions() {
    let fenceExtension = new LivingCodeFenceExtension({ context: props.context });
    let blockExtension = new LivingCodeBlockExtension({ context: props.context });

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
