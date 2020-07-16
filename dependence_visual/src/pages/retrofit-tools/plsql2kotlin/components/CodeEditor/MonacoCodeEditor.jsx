import React from "react";
import MonacoEditor from "react-monaco-editor";

export default function MonacoCodeEditor(props) {
  const editorOptions = {
    selectOnLineNumbers: true,
  };
  const editorTheme = "vs-dark";
  const editorHeight = "800";
  return (
    <MonacoEditor
      width="100%"
      height={editorHeight}
      language="sql"
      theme={editorTheme}
      value={props.value}
      options={editorOptions}
      onChange={(value) => props.onChange(value)}
    />
  );
}
