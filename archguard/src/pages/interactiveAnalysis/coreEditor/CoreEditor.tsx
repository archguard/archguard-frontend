import React, { useCallback, useState } from "react";
import RichMarkdownEditor from "rich-markdown-editor";

import { LivingCodeFenceExtension } from "@/pages/interactiveAnalysis/coreEditor/extension/LivingCodeFenceExtension";
import { LivingCodeBlockExtension } from "@/pages/interactiveAnalysis/coreEditor/extension/LivingCodeBlockExtension";
import { InteractiveAnalysisContext } from "@/pages/interactiveAnalysis/InteractiveAnalysisContext";

interface CoreEditorProps {
  value: string;
  context: InteractiveAnalysisContext;
  onChange: (value: string) => any;
}

function CoreEditor(props: CoreEditorProps) {
  const [value, setValue] = useState(props.value);

  function initExtensions() {
    let fenceExtension = new LivingCodeFenceExtension({ context: props.context });
    let blockExtension = new LivingCodeBlockExtension({ context: props.context });

    return [fenceExtension, blockExtension];
  }

  const onChange = useCallback((value: () => string) => {
    props.onChange(value());
  }, [setValue]);

  return (
    <div>
      <RichMarkdownEditor
        disableExtensions={["code_block", "code_fence"]}
        extensions={initExtensions()}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default CoreEditor;
