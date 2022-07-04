import { Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";
import { insightsLangToken } from "@/pages/insights/searchbar/lang/insightsLangToken";
import { insightsTheme } from "@/pages/insights/searchbar/lang/insightsTheme";
import { insightsCompletion } from "@/pages/insights/searchbar/lang/insightsCompletion";

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
}
