import { Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";
import { insightsLangToken } from "@/pages/insights/searchbar/lang/insightsLangToken";
import { insightsTheme } from "@/pages/insights/searchbar/lang/insightsTheme";
import { insightsCompletion } from "@/pages/insights/searchbar/lang/insightsCompletion";
import { insightsHoverProvider } from "@/pages/insights/searchbar/lang/insightsHoverProvider";

const State: languages.IState = {
  clone: () => ({ ...State }),
  equals: () => false,
};

export const LANG_ID = "insights";

export function addInsightsLanguage(monaco: Monaco) {

  monaco.languages.register({ id: LANG_ID });

  monaco.languages.setLanguageConfiguration(LANG_ID, {
    autoClosingPairs: [
      { open: "/", close: "/" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "%", close: "%" },
    ],
  });

  monaco.editor.defineTheme(LANG_ID, insightsTheme());

  monaco.languages.setMonarchTokensProvider(LANG_ID, insightsLangToken as any);

  monaco.languages.registerCompletionItemProvider(LANG_ID, insightsCompletion(monaco));

  monaco.languages.registerHoverProvider(LANG_ID, insightsHoverProvider(monaco));
}
