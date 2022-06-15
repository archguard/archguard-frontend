import React, { useCallback, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { loader } from "@monaco-editor/react";

const oneLineOption: monaco.editor.IStandaloneEditorConstructionOptions = {
  fontSize: 18,
  lineNumbers: "off",
  wordWrap: "off",
  lineNumbersMinChars: 0,
  overviewRulerLanes: 0,
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  lineDecorationsWidth: 0,
  glyphMargin: false,
  folding: false,
  scrollBeyondLastColumn: 0,
  minimap: {
    enabled: false,
  },
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: "never",
    seedSearchStringFromSelection: "never",
  },
  scrollbar: {
    horizontal: "hidden",
    vertical: "hidden",
    alwaysConsumeMouseWheel: false,
  }, // see: https://github.com/microsoft/monaco-editor/issues/1746
  wordBasedSuggestions: false,
  // avoid links underline
  links: false,
  // avoid highlight hover word
  occurrencesHighlight: false,
  cursorStyle: "line-thin",
  // hide current row highlight grey border
  // see: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html#renderlinehighlight
  renderLineHighlight: "none",
  contextmenu: false,
  // default selection is rounded
  roundedSelection: false,
  hover: {
    // unit: ms
    // default: 300
    delay: 100,
  },
  acceptSuggestionOnEnter: "on",
  // auto adjust width and height to parent
  // see: https://github.com/Microsoft/monaco-editor/issues/543#issuecomment-321767059
  automaticLayout: true,
  // if monaco is inside a table, hover tips or completion may casue table body scroll
  fixedOverflowWidgets: true,
};


function Insights() {
  const editorRef = useRef(null as any);
  const [height, setHeight] = useState("100%");

  const changeCode = useCallback(code => {
      if (editorRef.current) {
        // adjustHeight(editorRef.current);
      }
    },
    [editorRef]
  );

  const handleEditorDidMount = useCallback((editor: Editor) => {
      editorRef.current = editor;
      if (editorRef.current) {
        initEditor(editor);
      }
    },
    [editorRef, setHeight]
  );

  function initEditor(editor) {
    loader.init().then((monaco) => {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {});
      // editor.addCommand(monaco.KeyCode.Enter, () => {
      // State: https://github.com/microsoft/vscode/blob/1.56.0/src/vs/editor/contrib/suggest/suggestWidget.ts#L50
      // todo: handle for suggest
      // const StateOpen = 3
      // if (editor._contentWidgets['editor.widget.suggestWidget'].widget.state !== StateOpen) {
      // }
      // editor.trigger('', 'acceptSelectedSuggestion')
      // })
    });
  }

  return (
    <div>
      <div>Insights</div>
      <div style={{ height: "22px" }}>
        <Editor
          height="100%"
          language={"insights"}
          value={"context: all"}
          onChange={changeCode}
          onMount={handleEditorDidMount}
          options={oneLineOption}
        />
      </div>
    </div>
  );
}

export default Insights
