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
      { token: 'operator', foreground: '0451A5' },
      { token: 'keyword', foreground: 'f2590c' },
      { token: 'keyword.type', foreground: 'e7c547' },
      { token: 'string', foreground: '86b300' },
      { token: 'delimiter', foreground: 'e7c547' },
    ],
  });

  // based on: [https://microsoft.github.io/monaco-editor/monarch.html](https://microsoft.github.io/monaco-editor/monarch.html)
  monaco.languages.setMonarchTokensProvider('insights', {
    keywords: [
      'field'
    ],
    typeKeywords: [
      'dep_name', 'dep_version'
    ],
    operators: [
      '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
    ],

    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    symbols:  /[=><!~?:%]+/,
    tokenizer: {
      root: [
        [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'keyword.type',
            '@keywords': 'keyword',
            '@default': 'identifier' } }],

        [/[A-Z][\w$]*/, 'type.identifier' ],  // to show class names nicely

        { include: '@whitespace' },


        [/[:;]/, 'delimiter'],

        [/@symbols/, { cases: { '@operators': 'operator', '@default'  : '' } } ],

        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
        [/'([^'\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
        [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],
        [/'/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],
      ],

      string: [
        [/[^\\']+/,  'string'],
        [/[^\\"]+/,  'string'],
        [/@escapes/, 'string.escape'],
        [/\\./,      'string.escape.invalid'],
        [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ],
        [/'/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ],
      ],

      whitespace: [
        [/[ \t\r\n]+/, 'white']
      ],
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
