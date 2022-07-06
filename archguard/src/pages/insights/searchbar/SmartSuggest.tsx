import Editor, { loader, Monaco, useMonaco } from "@monaco-editor/react";
import React, { useCallback, useEffect, useRef } from "react";
import { addInsightsLanguage, LANG_ID } from "@/pages/insights/searchbar/insightsLang";

const oneLineOption: monaco.editor.IStandaloneEditorConstructionOptions = {
  lineHeight: 28,
  // Match the query input's height for suggestion items line height.
  suggestLineHeight: 34,
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
  // hide current row highlight grey border
  // see: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html#renderlinehighlight
  renderLineHighlight: "none",
  contextmenu: false,
  // default selection is rounded
  roundedSelection: false,
  hover: {
    // default: 300
    delay: 100,
  },
  // acceptSuggestionOnEnter: "on",
  // auto adjust width and height to parent
  // see: https://github.com/Microsoft/monaco-editor/issues/543#issuecomment-321767059
  automaticLayout: true,
  // if monaco is inside a table, hover tips or completion may casue table body scroll
  fixedOverflowWidgets: true,
  // config for registerCompletionItemProvider
  // quickSuggestions: false,
  cursorStyle: "line",
  cursorWidth: 1,
};

export interface SmartSuggestProps {
  code: string;
  onChange: (code: string) => void;
}

function SmartSuggest(props: SmartSuggestProps) {
  const editorRef = useRef(null as any);

  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      addInsightsLanguage(monaco);
    }
  }, [monaco]);

  function initEditor(editor) {
    loader.init().then((monaco) => {
      // disable `F1` for command palette
      editor.addCommand(monaco.KeyCode.F1, () => {});
      // disable `CTRL` + `F` for search
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {});

      // add handle for press enter
      editor.addCommand(monaco.KeyCode.Enter, () => {
        editor.trigger("", "acceptSelectedSuggestion");
      });

      // handle for paste
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

      monaco.editor.setModelLanguage(editor.getModel(), LANG_ID);
      monaco.editor.setTheme(LANG_ID);
    });
  }

  const changeCode = useCallback(
    (code) => {
      props.onChange(code);
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
    [editorRef],
  );

  return (
    <Editor
      value={props.code}
      onChange={changeCode}
      onMount={handleEditorDidMount}
      height="100%"
      options={oneLineOption}
    />
  );
}

export default SmartSuggest;
