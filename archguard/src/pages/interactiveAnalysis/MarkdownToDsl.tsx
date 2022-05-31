import { Node } from "@types/unist"
import { Table } from "mdast";

export function markdownToDsl(rootnode: Node) {
  let repos = [];
  if (rootnode["children"]) {
    for (let child of rootnode["children"]) {
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
          console.log(rootnode.type);
      }
    }
  }

  return repos;
}
