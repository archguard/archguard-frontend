import { Monaco } from "@monaco-editor/react";

export const practisesCompletion = (monaco: Monaco, range) => [
  {
    label: "\"DDD\"",
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: "DDD Layered",
    insertText: `val layer = layered {
    component("interface") dependentOn component("application")
    component("interface") dependentOn component("domain")
    component("interface") dependentOn component("infrastructure")
    component("application") dependentOn component("domain")
    component("application") dependentOn component("infrastructure")
    component("domain") dependentOn component("infrastructure")
}`,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range
  }
];
