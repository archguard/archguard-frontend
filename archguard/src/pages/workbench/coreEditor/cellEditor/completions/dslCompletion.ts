import { Monaco } from "@monaco-editor/react";

export const dslCompletion = (monaco: Monaco, range) => [
  {
    label: "\"archguard\"",
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: "Use ArchGuard",
    insertText: "%use archguard\n\n",
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range
  },
  {
    label: "\"repos\"",
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: "Describe repos",
    insertText:
      `repos {
    repo(name = "$\{1:name}", language = "$\{2:java}", scmUrl = "$\{3:scmUrl}")
}`,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range
  },
  {
    label: "\"repo\"",
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: "Describe single repo",
    insertText: "repo(name = \"${1:name}\", language = \"${2:java}\", scmUrl = \"${3:scmUrl}\")",
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range
  },
  {
    label: "\"scan\"",
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: "Describe create scan",
    insertText:
      `scan("$\{1:Backend}") {
    languages("$\{2:Kotlin}")
    specs("$\{3:datamap}", "$\{4:apicalls}")
}`,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range
  },
  {
    label: "\"github\"",
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: "Github link",
    insertText: "\"https://github.com/\"",
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.KeepWhitespace,
    range: range
  }
];
