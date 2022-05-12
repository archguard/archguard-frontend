import React  from "react";
import { useIntl } from 'umi';
import Editor from "@monaco-editor/react";

function CoreEditor() {
  const { formatMessage } = useIntl();

  return (<div>
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  </div>)
}

export default CoreEditor;
