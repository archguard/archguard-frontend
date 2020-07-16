import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/blackboard.css";
import "codemirror/mode/sql/sql";
import "codemirror/mode/clike/clike";

import './CodemirrorCodeEditor.css'

export default function CodemirrorCodeEditor(props) {
  return (
    <CodeMirror
      value={props.value}
      options={{
        mode: props.language,
        theme: "blackboard",
        lineNumbers: true,
      }}
      onBeforeChange={(editor, data, value) => {props.onChange(value)}}
    />
  );
}
