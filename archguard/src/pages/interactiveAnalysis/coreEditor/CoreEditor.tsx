import React from "react";
import RichMarkdownEditor from "rich-markdown-editor";
import { LivingCodeFenceExtension } from "@/pages/interactiveAnalysis/coreEditor/extension/LivingCodeFenceExtension";
import { LivingCodeBlockExtension } from "@/pages/interactiveAnalysis/coreEditor/extension/LivingCodeBlockExtension";

interface CoreEditorProps {
  value: string;
}

function CoreEditor(props: CoreEditorProps) {
  return (
    <div>
      <RichMarkdownEditor
        disableExtensions={["code_block", "code_fence"]}
        extensions={[new LivingCodeFenceExtension(), new LivingCodeBlockExtension()]}
        value={props.value}
      />
    </div>
  );
}

export default CoreEditor;
