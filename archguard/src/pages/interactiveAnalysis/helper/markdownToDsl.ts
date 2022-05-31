import { Table } from "mdast";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";

// todo: add tests
export function markdownToDsl(text: string) {
  let rootNode = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .parse(text);

  let repos = [];
  if (rootNode["children"]) {
    for (let child of rootNode["children"]) {
      switch (child.type) {
        case "table":
          // eslint-disable-next-line no-case-declarations
          const mdTable = child as Table
          // eslint-disable-next-line no-case-declarations
          const table = [];
          for (let row of mdTable["children"]) {
            let newRow = [];
            for (let cell of row["children"]) {
              let text = "";
              if (!cell["children"]) {
                continue;
              }

              let firstEl = cell["children"][0];
              if (!firstEl) {
                continue;
              }

              switch (firstEl.type) {
                case "text":
                  text = firstEl.value;
                  break;
                case "link":
                  text = firstEl.url;
                  break;
              }

              newRow.push(text);
            }
            table.push(newRow);
          }

          // eslint-disable-next-line no-case-declarations
          const header = table.shift();
          for (let row of table) {
            let repoEl = [];
            for (let index in row) {
              repoEl.push(`${ header[index] }="${ row[index] }"`);
            }
            repos.push("repo(" + repoEl.join(",") + ")");
          }
          break;
        default:
          console.log(rootNode.type);
      }
    }
  }

  return repos;
}
