import { Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";

const State: languages.IState = {
  clone: () => ({ ...State }),
  equals: () => false
};

export function addSearchSuggestion(monaco: Monaco) {
  function createSuggestion(range): languages.CompletionItem[] {
    // todo: need fetch suggestions by API and types
    let completions = [];

    completions = ['diff', 'commit', 'symbol', 'repo', 'path', 'file'].map((value) => ({
      label: value,
      kind: monaco.languages.CompletionItemKind.Value,
      insertText: value,
      filterText: value,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range
    }))

    // by connection to type
    return completions;
  }

  monaco.languages.register({ id: "insights" });
  // todo: defineTheme
  monaco.languages.setTokensProvider("insights", {
    getInitialState: () => State,
    tokenize: (line: string, state: languages.IState) => {
      // todo: decorate token
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
      return {
        suggestions: createSuggestion(range)
      };
    }
  });
}
