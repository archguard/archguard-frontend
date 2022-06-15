import Editor, { loader, Monaco } from "@monaco-editor/react";
import React, { useCallback, useRef, useState } from "react";
import { languages } from "monaco-editor";
import { dslCompletion } from "@/pages/interactiveAnalysis/coreEditor/cellEditor/completions/dslCompletion";
import { practisesCompletion } from "@/pages/interactiveAnalysis/coreEditor/cellEditor/completions/practisesCompletion";

const oneLineOption: monaco.editor.IStandaloneEditorConstructionOptions = {
  lineHeight: 16,
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
  // Display the cursor as a 1px line.
  quickSuggestions: false,
  cursorStyle: 'line',
  cursorWidth: 1,
};


const State: languages.IState =  {
  clone: () => ({ ...State }),
  equals: () => false,
}

function createCompletion(monaco: Monaco) {
  function createDependencyProposals(range): languages.CompletionItem[] {
    let completions = dslCompletion(monaco, range);
    completions = completions.concat(practisesCompletion(monaco, range))
    return completions;
  }

  monaco.languages.register({ id: "insights" })
  // todo: defineTheme
  monaco.languages.setTokensProvider("insights", {
    getInitialState: () => State,
    tokenize: (line: string, state: languages.IState) => {
      return {
        endState: State,
        tokens: [{
          startIndex: 0,
          scopes: 'type'
        }],
      }
    }
  });

  monaco.languages.registerCompletionItemProvider("insights", {
    provideCompletionItems: function (model, position) {
      model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return {
        suggestions: createDependencyProposals(range),
      };
    }
  });
}

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

      createCompletion(monaco)
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
