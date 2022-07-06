import { Monaco } from "@monaco-editor/react";
import { getSuggestType } from "@/pages/insights/searchbar/lang/suggestType";

export function insightsHoverProvider(monaco: Monaco) {
  return {
    provideHover: function(model, position) {
      // todo: change to model and position
      return {
        range: new monaco.Range(
          1,
          1,
          model.getLineCount(),
          model.getLineMaxColumn(model.getLineCount())
        ),
        contents: [
          { value: `**Type: ${ getSuggestType() }**` },
          {
            value: `\`\`\`markdown
examples:
query for log4j: \`field:dep_name == %log4j%\`
query for issues: \`field:name == "HTTP_API_SMELL"\`

\`\`\``
          }
        ]
      };
    }
  };
}
