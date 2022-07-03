import { Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";
import { insightsLangToken } from "@/pages/insights/searchbar/lang/insightsLangToken";
import { insightsTheme } from "@/pages/insights/searchbar/lang/insightsTheme";
import { insightsCompletion } from "@/pages/insights/searchbar/lang/insightsCompletion";

const State: languages.IState = {
  clone: () => ({ ...State }),
  equals: () => false,
};

export function insightsLanguage(monaco: Monaco) {
  monaco.languages.register({ id: "insights" });

  monaco.languages.setLanguageConfiguration("insights", {
    autoClosingPairs: [
      { open: "/", close: "/" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "%", close: "%" },
    ],
  });

  monaco.editor.defineTheme("insights", insightsTheme());

  monaco.languages.setMonarchTokensProvider("insights", insightsLangToken as any);

  monaco.languages.registerCompletionItemProvider("insights", insightsCompletion(monaco));
}
