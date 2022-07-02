import { Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";
import { insightLangDef } from "@/pages/insights/searchbar/insightLangDef";

const State: languages.IState = {
  clone: () => ({ ...State }),
  equals: () => false,
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

  monaco.languages.setLanguageConfiguration("insights", {
    autoClosingPairs: [
      { open: "/", close: "/" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "%", close: "%" },
    ],
  });

  monaco.editor.defineTheme("insights", {
    colors: {
      "editor.background": "#fafafa",
      "editor.foreground": "#5c6773",
      "editorIndentGuide.background": "#ecebec",
      "editorIndentGuide.activeBackground": "#e0e0e0"
    },
    encodedTokensColors: [],
    inherit: false,
    base: "vs",
    rules: [
      { token: "", foreground: "#5c6773" },

      { token: "keyword", foreground: "#ffa500" },

      { token: "string", foreground: "#86b300", fontStyle: "bold" },
      { token: "number.version", foreground: "#86b300", fontStyle: "bold" },
      { token: "string.like", foreground: "#3a0505", fontStyle: "bold" },

      // make it in red for careful user
      { token: "regexp", foreground: "#ea4335", fontStyle: "bold" },

      { token: "identifier", foreground: "#0000ff" },

      { token: "delimiter", foreground: "#008000" }
    ]
  } as any);

  monaco.languages.setMonarchTokensProvider("insights", insightLangDef as any);

  monaco.languages.registerCompletionItemProvider("insights", {
    triggerCharacters: [":", "f"],
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

      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      if (textUntilPosition.match(/field:.*/m)) {
        return {
          suggestions: createSuggestion(range, "sca", monaco),
        };
      } else {
        return { suggestions: createNormal(monaco, range) };
      }
    },
  });
}
