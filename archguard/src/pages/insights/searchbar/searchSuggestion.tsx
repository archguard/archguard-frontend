import { Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";

const State: languages.IState = {
  clone: () => ({ ...State }),
  equals: () => false
};

function createNormal(
  monaco: Monaco,
  range: { endColumn: number; startColumn: number; endLineNumber: number; startLineNumber: number },
): languages.CompletionItem[] {
  // let symbols = ["==", "!=", ">=", "<=", "<", ">"];
  return ["field"].map((value) => ({
    label: value,
    kind: monaco.languages.CompletionItemKind.Value,
    insertText: value,
    filterText: value,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range,
  }));
}

function createSuggestion(range, inputType: string, monaco: Monaco): languages.CompletionItem[] {
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

export function addSearchSuggestion(monaco: Monaco) {
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
    base: "vs",
    rules: [
      { token: '', foreground: '#5c6773' },

      { token: 'keyword', foreground: '#ffa500' },

      { token: 'string', foreground: '#86b300', fontStyle: 'bold'  },
      { token: 'number.version', foreground: '#86b300', fontStyle: 'bold' },
      { token: 'string.like', foreground: '#3a0505', fontStyle: 'bold' },

      // make it in red for careful user
      { token: 'regexp', foreground: '#ea4335', fontStyle: 'bold'  },

      { token: 'identifier', foreground: '#0000ff' },

      { token: 'delimiter', foreground: '#008000' },
    ],
  });

  monaco.languages.setMonarchTokensProvider('insights', {
    defaultToken: 'invalid',
    tokenPostfix: '.insights',

    keywords: [
      'field'
    ],
    typeKeywords: [

    ],
    operators: [
      '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
    ],

    symbols: /[=><!~?&|+\-*\/\^]+/,

    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    digits: /\d+(_+\d+)*/,
    octaldigits: /[0-7]+(_+[0-7]+)*/,
    binarydigits: /[0-1]+(_+[0-1]+)*/,
    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

    versionString: /[0-9a-zA-Z_-]+/,

    regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
    regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

    tokenizer: {
      root: [
        [/[a-zA-Z_$][\w$]*/, { cases: { '@keywords': 'keyword.$0', '@default': 'identifier' } }],

        { include: '@whitespace' },

        // regular expression: ensure it is terminated before beginning (otherwise it is an operator)
        [/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/, { token: 'regexp', bracket: '@open', next: '@regexp' }],

        // numbers
        [/(@digits)\.(@digits)\.(@versionString)?/, 'number.version'],
        // normal numbers
        [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
        [/0[xX](@hexdigits)/, 'number.hex'],
        [/0[oO]?(@octaldigits)/, 'number.octal'],
        [/0[bB](@binarydigits)/, 'number.binary'],
        [/(@digits)/, 'number'],

        [/[:;]/, 'delimiter'],

        [/@symbols/, { cases: { '@operators': 'operator', '@default'  : '' } } ],

        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
        [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
        [/%([^%\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
        [/"/, 'string', '@string_double'],
        [/'/, 'string', '@string_single'],
        [/%/, 'string.like', '@string_like'],
      ],

      string_double: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, 'string', '@pop']
      ],

      string_single: [
        [/[^\\']+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/'/, 'string', '@pop']
      ],

      string_like: [
        [/[^\\%]+/, 'string.like'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/%/, 'string.like', '@pop']
      ],

      whitespace: [
        [/[ \t\r\n]+/, 'white']
      ],

      // We match regular expression quite precisely
      regexp: [
        [/(\{)(\d+(?:,\d*)?)(\})/, ['regexp.escape.control', 'regexp.escape.control', 'regexp.escape.control']],
        [/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ['regexp.escape.control', { token: 'regexp.escape.control', next: '@regexrange' }]],
        [/(\()(\?:|\?=|\?!)/, ['regexp.escape.control', 'regexp.escape.control']],
        [/[()]/, 'regexp.escape.control'],
        [/@regexpctl/, 'regexp.escape.control'],
        [/[^\\\/]/, 'regexp'],
        [/@regexpesc/, 'regexp.escape'],
        [/\\\./, 'regexp.invalid'],
        [/(\/)([gimsuy]*)/, [{ token: 'regexp', bracket: '@close', next: '@pop' }, 'keyword.other']],
      ],

      regexrange: [
        [/-/, 'regexp.escape.control'],
        [/\^/, 'regexp.invalid'],
        [/@regexpesc/, 'regexp.escape'],
        [/[^\]]/, 'regexp'],
        [/\]/, { token: 'regexp.escape.control', next: '@pop', bracket: '@close' }],
      ],
    } as any
  });
  // based on: [https://microsoft.github.io/monaco-editor/monarch.html](https://microsoft.github.io/monaco-editor/monarch.html)

  monaco.languages.registerCompletionItemProvider("insights", {
    triggerCharacters: [':', "f"],
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
          suggestions: createSuggestion(range, 'sca', monaco)
        };
      } else {
        return { suggestions: createNormal(monaco, range) };
      }
    }
  });
}
