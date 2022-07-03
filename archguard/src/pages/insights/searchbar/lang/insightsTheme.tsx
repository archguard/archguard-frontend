export function insightsTheme() {
  return {
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
  } as any;
}
