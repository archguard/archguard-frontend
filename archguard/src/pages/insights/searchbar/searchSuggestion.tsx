import { Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";

const State: languages.IState = {
  clone: () => ({ ...State }),
  equals: () => false
};

function textLiteral(line: string) {
  // todo: after design DSL
}

export function addSearchSuggestion(monaco: Monaco) {
  function createSuggestion(range, inputType: string): languages.CompletionItem[] {
    // todo: need fetch suggestions by API and types
    let completions: any[];

    let types = [];
    switch (inputType) {
      case "sca":
        types = ["dep_name", "dep_version"];
        break;
      case "issue":
        types = ["name"];
        break;
    }

    completions = [...types].map((value) => ({
      label: value,
      kind: monaco.languages.CompletionItemKind.Value,
      insertText: value,
      filterText: value,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    }));

    // by connection to type
    return completions;
  }

  monaco.languages.register({ id: "insights" });
  // todo: defineTheme

  monaco.editor.defineTheme("insights", {
    colors: {
      'editor.background': '#fafafa',
      'editor.foreground': '#5c6773',
      'editorIndentGuide.background': '#ecebec',
      'editorIndentGuide.activeBackground': '#e0e0e0',
    },
    encodedTokensColors: [],
    inherit: false,
    base: "vs-dark",
    rules: [
      { token: '', foreground: '5c6773' },
      { token: 'keyword.field', foreground: '86b300' },
    ],
  });

  monaco.languages.setTokensProvider("insights", {
    getInitialState: () => State,
    tokenize: (line: string) => {
      // todo: decorate token
      textLiteral(line)

      return {
        endState: State,
        tokens: [{
          startIndex: 0,
          scopes: "type"
        }]
      };
    }
  });

  monaco.languages.registerCompletionItemProvider("insights", {
    triggerCharacters: [':'],
    provideCompletionItems: function(model, position) {
      model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });

      const word = model.getWordUntilPosition(position);

      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const textUntilPosition = model.getValueInRange({ startLineNumber: position.lineNumber, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column })
      if (textUntilPosition.match(/field:.*/m)) {
        return {
          suggestions: createSuggestion(range, 'sca')
        };
      } else {
        return { suggestions: [] };
      }
    }
  });
}
