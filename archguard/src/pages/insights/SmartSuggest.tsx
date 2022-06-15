import Editor, { loader } from "@monaco-editor/react";
import React, { useCallback, useRef, useState } from "react";

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

function SmartSuggest(props: any) {
  const editorRef = useRef(null as any);
  const [height, setHeight] = useState("100%");

  const changeCode = useCallback(
    (code) => {
      if (editorRef.current) {
        // adjustHeight(editorRef.current);
      }
    },
    [editorRef],
  );

  const handleEditorDidMount = useCallback(
    (editor: Editor) => {
      editorRef.current = editor;
      if (editorRef.current) {
        initEditor(editor);
      }
    },
    [editorRef, setHeight],
  );

  function initEditor(editor) {
    loader.init().then((monaco) => {
      // disable `F1` for command palette
      editor.addCommand(monaco.KeyCode.F1, () => {});
      // disable `CTRL` + `F` for search
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {});

      editor.addCommand(monaco.KeyCode.Enter, () => {
        // State: https://github.com/microsoft/vscode/blob/1.56.0/src/vs/editor/contrib/suggest/suggestWidget.ts#L50
        const StateOpen = 3;
        if (editor._contentWidgets["editor.widget.suggestWidget"].widget.state !== StateOpen) {
          // todo: handle for custom suggest
        }
        editor.trigger("", "acceptSelectedSuggestion");
      });

      // deal with user paste
      // see: https://github.com/microsoft/monaco-editor/issues/2009#issue-63987720
      editor.onDidPaste((e) => {
        // multiple rows will be merged to single row
        if (e.range.endLineNumber <= 1) {
          return;
        }

        let newContent = "";
        const textModel = editor.getModel();
        const lineCount = textModel.getLineCount();
        // remove all line breaks
        for (let i = 0; i < lineCount; i += 1) {
          newContent += textModel.getLineContent(i + 1);
        }
        textModel.setValue(newContent);
        editor.setPosition({ column: newContent.length + 1, lineNumber: 1 });
      });
    });
  }

  return <Editor
    height="100%"
    language={"insights"}
    value={"context: all"}
    onChange={changeCode}
    onMount={handleEditorDidMount}
    options={oneLineOption}
  />
}

export default SmartSuggest
