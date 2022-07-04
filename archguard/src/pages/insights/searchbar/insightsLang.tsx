import { Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";
import { insightsLangToken } from "@/pages/insights/searchbar/lang/insightsLangToken";
import { insightsTheme } from "@/pages/insights/searchbar/lang/insightsTheme";
import { insightsCompletion } from "@/pages/insights/searchbar/lang/insightsCompletion";
import { getSuggestType } from "@/pages/insights/searchbar/lang/suggestType";

const State: languages.IState = {
  clone: () => ({ ...State }),
  equals: () => false,
};

export function addInsightsLanguage(monaco: Monaco) {
  let languageId = "insights";

  monaco.languages.register({ id: languageId });

  monaco.languages.setLanguageConfiguration(languageId, {
    autoClosingPairs: [
      { open: "/", close: "/" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "%", close: "%" },
    ],
  });

  monaco.editor.defineTheme(languageId, insightsTheme());

  monaco.languages.setMonarchTokensProvider(languageId, insightsLangToken as any);

  monaco.languages.registerCompletionItemProvider(languageId, insightsCompletion(monaco));

  monaco.languages.registerHoverProvider(languageId, {
    provideHover: function (model, position) {
      // todo: change to model and position

      return {
        range: new monaco.Range(
          1,
          1,
          model.getLineCount(),
          model.getLineMaxColumn(model.getLineCount()),
        ),
        contents: [
          { value: `**Type: ${getSuggestType()}**` },
          { value: `\`\`\`markdown
examples:
query for log4j: \`field:dep_name == %log4j%\`
query for issues: \`field:name == "HTTP_API_SMELL"\`

\`\`\`` }],
      };
    },
  });
}
