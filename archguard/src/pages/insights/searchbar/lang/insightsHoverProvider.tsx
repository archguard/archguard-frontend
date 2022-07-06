import { Monaco } from "@monaco-editor/react";
import { editor, IMarkdownString, languages } from "monaco-editor";
import { InsightToken, literal } from "@/pages/insights/searchbar/lang/literal";

function tokenToPosition(textModel: editor.ITextModel, token: InsightToken, monaco: Monaco) {
  const start = textModel.getPositionAt(token.start);
  const end = textModel.getPositionAt(token.end);
  return new monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column);
}

export function insightsHoverProvider(monaco: Monaco): languages.HoverProvider {
  return {
    provideHover: function (textModel, position) {
      const values: IMarkdownString[] = [];

      let offsetAt = textModel.getOffsetAt(position);
      let tokens = literal(textModel.getValue());

      const tokensAtCursor = tokens.filter((token) => {
        return token.start <= offsetAt && offsetAt <= token.end;
      });

      let range: monaco.Range | undefined = undefined;

      tokensAtCursor.map((token: InsightToken) => {
        switch (token.type) {
          case "separator":
            break;
          case "literal":
            values.push({ value: "blalala" });
            range = tokenToPosition(textModel, token, monaco);
            break;
          case "string":
            values.push({ value: "string" });
            range = tokenToPosition(textModel, token, monaco);
            break;
          case "regex":
            break;
          case "like":
            values.push({ value: "is a like" });
            range = tokenToPosition(textModel, token, monaco);
            break;
          case "comparison":
            break;
          case "space":
            break;
          case "error":
            break;
        }
      });

      return {
        range: range,
        contents: values,
      };
    },
  };
}
