import React, { useCallback, useState } from "react";
import Editor from "@monaco-editor/react";

interface BlockEditorProps {
  code: String,
  language: String,
}

function BlockEditor(props: BlockEditorProps) {
  // todo: count height by line height
  const autoAdjustEditorHeight = useCallback(() => {

  }, [])

  return (<div>
    <Editor
      height="90vh"
      defaultLanguage={ props.language }
      defaultValue={ props.code }
    />
    <div>Block Result</div>
  </div>)
}

export default BlockEditor;
