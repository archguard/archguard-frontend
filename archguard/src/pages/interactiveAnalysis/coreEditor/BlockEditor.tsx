import React, { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

interface BlockEditorProps {
  code: String,
  language: String,
}

function BlockEditor(props: BlockEditorProps) {
  const editorRef = useRef(null);
  const [height, setHeight] = useState("20vh")
  const [code] = useState(props.code)

  const handleEditorDidMount = useCallback((editor: Editor, monaco) => {
    editorRef.current = editor;
    if (!!editorRef.current) {
      let editorHeight = editorRef.current.getTopForLineNumber(Number.MAX_SAFE_INTEGER)
      setHeight(editorHeight + "px")
    }
  }, [editorRef, setHeight])

  const changeCode = useCallback((code) => {

  });

  return (<div>
    <Editor
      height={ height }
      defaultLanguage={ props.language }
      value={ code }
      onChange={ changeCode }
      onMount={ handleEditorDidMount }
    />
    <div>Block Result</div>
  </div>)
}

export default BlockEditor;
