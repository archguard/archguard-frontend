import React, { useCallback, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

interface BlockEditorProps {
  code: String,
  language: String,
}

function BlockEditor(props: BlockEditorProps) {
  const editorRef = useRef(null);
  const [height, setHeight] = useState("20vh")
  const [code] = useState(props.code)

  function adjustHeight(editor: monaco.editor.IStandaloneCodeEditor) {
    const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight)
    const lineCount = editor.getModel()?.getLineCount() || 1
    let editorHeight = editor.getTopForLineNumber(lineCount + 1) + lineHeight

    setHeight(editorHeight + "px")
    editor.layout({width: editor.getLayoutInfo().width, height: editorHeight})
  }

  const handleEditorDidMount = useCallback((editor: Editor, monaco) => {
    editorRef.current = editor;
    if (!!editorRef.current) {
      adjustHeight(editorRef.current);
    }
  }, [editorRef, setHeight, code])

  const changeCode = useCallback((code) => {
    if (!!editorRef.current) {
      adjustHeight(editorRef.current);
    }
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
