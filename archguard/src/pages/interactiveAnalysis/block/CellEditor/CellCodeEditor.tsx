import * as React from "react";
import Editor from "@monaco-editor/react";

export class CellCodeEditor extends React.Component<{}, {}> {
  hole: React.RefObject<HTMLParagraphElement>;

  constructor(props: {}) {
    super(props);
    this.hole = React.createRef();
  }

  append(node: HTMLElement) {
    if (this.hole) {
      // this.hole.current!.appendChild(node);
    }
  }

  render() {
    return <Editor
      height="20vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />;
  }
}
