import React, { useCallback, useRef, useState } from "react";
import { Button } from "antd";
import Editor from "@monaco-editor/react";
import { CaretRightOutlined } from "@ant-design/icons";

interface BlockEditorProps {
  code: String,
  language: String,
  evalCode: Function,
}

function CellEditor(props: BlockEditorProps) {
  const editorRef = useRef(null);
  const [height, setHeight] = useState("100%")
  const [code, setCode] = useState(props.code)

  function adjustHeight(editor: monaco.editor.IStandaloneCodeEditor) {
    const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight)
    const lineCount = editor.getModel()?.getLineCount() || 1
    let editorHeight = editor.getTopForLineNumber(lineCount + 1) + lineHeight

    setHeight(editorHeight + "px")
    editor.layout({ width: editor.getLayoutInfo().width, height: editorHeight })
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
      setCode(code)
    }
  }, [setCode]);

  const runCode = useCallback(() => {
    props.evalCode(code);
  }, [code]);

  return (<div>
    <Button type="primary" icon={<CaretRightOutlined />} onClick={ runCode } />
    <Editor
      height={ height }
      defaultLanguage={ props.language }
      value={ code }
      onChange={ changeCode }
      onMount={ handleEditorDidMount }
      options={{ scrollBeyondLastLine: false, automaticLayout: true }}
    />
  </div>)
}

export default CellEditor;
