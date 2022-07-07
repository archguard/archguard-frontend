import { Monaco } from "@monaco-editor/react";
import { editor, IMarkdownString, languages } from "monaco-editor";
import { InsightToken, literal } from "@/pages/insights/searchbar/lang/literal";

function tokenToPosition(textModel: editor.ITextModel, token: InsightToken, monaco: Monaco) {
  const start = textModel.getPositionAt(token.start);
  const end = textModel.getPositionAt(token.end);
  return new monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column);
}

let COMMON_HELP = `\`\`\`
field:dep_name == /.*dubbo/
|      |       |         |
└─分割符└─字段   └─ 比较符  └─ 值
\`\`\`

- 比较符。即：\`==\`、\`>\`、\`<\`、\`>=\`、\`<=\`、\`!=\`。
- 值。

`;

const SCA_TIP = `
## 标识符

- 说明：项目依赖（Gradle/Maven、NPM 等）
- 数据库表：\`project_composition_dependencies\`

支持 \`dep_name\` 和 \`dep_version\` 的查询：

- dep_name：查询某个模块的所有版本。
- dep_version：查询某个版本号，并可进行比较。

${ COMMON_HELP }
`

const VALUE_TIP = `
## 值

以 \`'\` 或者 \`"\` 在**始尾**表示字符串，\`/\` 在**始尾**表示为正则，\`%\` 在**始尾**表示为模糊匹配。
- 字符串（FilterType.NORMAL）。\`'xxx'\`、\`"xxx"\` 的形式，即视为字符串。
- 正则（不推荐，FilterType.REGEX）。\`/xxx/\` 的形式，即视为正则。
- 模糊匹配（**建议**，FilterType.LIKE）。\`%xxx%\` 的形式，即视为模糊匹配。
  - 如果字符串以 \`%\` 开始或结束，也视为模糊匹配，示例：'xxx%'、'%xxx'。
- 版本号。示例：\`1.2.3-alpha\`

`

const COMPARISON_TIP = `
## 比较符

常用：\`==\`

支持的所有比较形式：

- \`==\`
- \`>\`
- \`<\`
- \`>=\`
- \`<=\`
- \`!=\`
`

const KEYWORD_TIP = `
## 关键字

当前支持：

- \`field\`：查询某个字段。

`;

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

      let hasTipForError = false;

      tokensAtCursor.map((token: InsightToken) => {
        switch (token.type) {
          case "keyword":
            values.push({ value: KEYWORD_TIP });
            range = tokenToPosition(textModel, token, monaco);
            break;
          case "identifier":
            values.push({ value: SCA_TIP });
            range = tokenToPosition(textModel, token, monaco);
            break;
          case "string":
            values.push({ value: VALUE_TIP });
            range = tokenToPosition(textModel, token, monaco);
            break;
          case "regex":
            values.push({ value: VALUE_TIP });
            range = tokenToPosition(textModel, token, monaco);
            break;
          case "like":
            values.push({ value: VALUE_TIP });
            range = tokenToPosition(textModel, token, monaco);
            break;
          case "comparison":
            values.push({ value: COMPARISON_TIP });
            range = tokenToPosition(textModel, token, monaco);
            break;
          case "separator":
            break;
          case "space":
            break;
          case "error":
            if(!hasTipForError) {
              values.push({ value: COMMON_HELP });
              range = tokenToPosition(textModel, token, monaco);
            }
            hasTipForError = true;
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
