import { loader } from "@monaco-editor/react";
import { CancellationToken, editor, languages, Position } from "monaco-editor";

let hasLoaderDsl = false;

export function addDslCompletion() {
  if (hasLoaderDsl) {
    return;
  }

  hasLoaderDsl = true;

  loader.init().then((monaco) => {
    function createDependencyProposals(range): languages.CompletionItem[] {
      return [
        {
          label: '"repos"',
          kind: monaco.languages.CompletionItemKind.Function,
          documentation: "Describe repos",
          insertText: "${1:repos}: ${2:{\n    }\n}",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
        },
      ];
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
