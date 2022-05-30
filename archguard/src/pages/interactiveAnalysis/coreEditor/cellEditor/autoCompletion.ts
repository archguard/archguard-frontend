import { loader } from "@monaco-editor/react";
import { languages } from "monaco-editor";
import { dslCompletion } from "@/pages/interactiveAnalysis/coreEditor/cellEditor/completions/dslCompletion";
import { practisesCompletion } from "@/pages/interactiveAnalysis/coreEditor/cellEditor/completions/practisesCompletion";

let hasLoaderDsl = false;

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
