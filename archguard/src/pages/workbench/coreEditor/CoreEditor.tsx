import React, { useCallback, useState } from "react";
import RichMarkdownEditor from "rich-markdown-editor";

import { LivingCodeFenceExtension } from "@/pages/workbench/coreEditor/extension/LivingCodeFenceExtension";
import { LivingCodeBlockExtension } from "@/pages/workbench/coreEditor/extension/LivingCodeBlockExtension";
import { WorkbenchContext } from "@/pages/workbench/WorkbenchContext";

interface CoreEditorProps {
  value: string;
  context: WorkbenchContext;
  onChange: (value: string) => any;
  onSave: (value: string) => any;
}

function CoreEditor(props: CoreEditorProps) {
  const [value, setValue] = useState(props.value);

  function initExtensions() {
    let fenceExtension = new LivingCodeFenceExtension({ context: props.context });
    let blockExtension = new LivingCodeBlockExtension({ context: props.context });

    return [fenceExtension, blockExtension];
  }

  const onChange = useCallback(
    (value: () => string) => {
      let val = value();
      props.onChange(val);
      setValue(val);
    },
    [setValue],
  );

  const onSave = useCallback(
    ({ done: boolean }) => {
      props.onSave(value);
    },
    [value],
  );

  return (
    <div>
      <RichMarkdownEditor
        disableExtensions={["code_block", "code_fence"]}
        extensions={initExtensions()}
        onChange={onChange}
        onSave={onSave}
        defaultValue={value}
      />
    </div>
  );
}

export default CoreEditor;
