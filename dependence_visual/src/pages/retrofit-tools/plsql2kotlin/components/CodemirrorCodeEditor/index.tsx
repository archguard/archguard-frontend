import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/blackboard.css";
import "codemirror/mode/sql/sql";
import "codemirror/mode/clike/clike";

import './index.css'

interface CodemirrorCodeEditorProps {
  value: string;
  language: string;
  onChange: Function;
}

export default function CodemirrorCodeEditor(props: CodemirrorCodeEditorProps) {
  const { value, language, onChange } = props

  return (
    <CodeMirror
      value={value}
      options={{
        mode: language,
        theme: "blackboard",
        lineNumbers: true,
      }}
      onBeforeChange={(editor, data, value) => {onChange(value)}}
    />
  );
}
