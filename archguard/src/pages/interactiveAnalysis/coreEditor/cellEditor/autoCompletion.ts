import { loader, Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";

let hasLoaderDsl = false;

const dslCompletion = (monaco: Monaco, range) => [
  {
    label: '"repos"',
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: "Describe repos",
    insertText:
      'repos {\n    repo(name = "${1:name}", language = "${2:java}", scmUrl = "${3:scmUrl}")\n}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range,
  },
  {
    label: '"repo"',
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: "Describe single repo",
    insertText: 'repo(name = "${1:name}", language = "${2:java}", scmUrl = "${3:scmUrl}")',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range,
  },
  {
    label: '"scan"',
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: "Describe create scan",
    insertText:
      'scan("${1:Backend}") {\n    languages("${2:Kotlin}")\n    specs("${3:datamap}", "${4:apicalls}")\n}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range,
  },
  {
    label: '"github"',
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: "Github link",
    insertText: '"https://github.com/"',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.KeepWhitespace,
    range: range,
  },
];

const practisesCompletion = (monaco: Monaco, range) => [
  {
    label: '"DDD"',
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
    range: range,
  }
];

export function addAutoCompletion() {
  if (hasLoaderDsl) {
    return;
  }

  hasLoaderDsl = true;

  loader.init().then((monaco) => {
    function createDependencyProposals(range): languages.CompletionItem[] {
      let completions = dslCompletion(monaco, range);
      completions = completions.concat(practisesCompletion(monaco, range))
      return completions;
    }

    // todo: add document semantic tokens
    // monaco.languages.registerDocumentSemanticTokensProvider("kotlin", {
    //   getLegend(): languages.SemanticTokensLegend {
    //     return undefined;
    //   },
    //   provideDocumentSemanticTokens(model: editor.ITextModel, lastResultId: string | null, token: CancellationToken): languages.ProviderResult<languages.SemanticTokens | languages.SemanticTokensEdits> {
    //     return undefined;
    //   },
    //   releaseDocumentSemanticTokens(resultId: string | undefined): void {
    //   }
    // });

    monaco.languages.registerCompletionItemProvider("kotlin", {
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
      },
    });
  });
}
