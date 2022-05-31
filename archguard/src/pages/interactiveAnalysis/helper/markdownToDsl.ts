import { Table } from "mdast";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";

function astToTable(child: any) {
  const mdTable = child as Table;
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
  return table;
}

function processTable(child: any) {
  const table = astToTable(child);
  const header = table.shift();
  const repos = [];
  for (let row of table) {
    let repoEl = [];
    for (let index in row) {
      repoEl.push(`${header[index]}="${row[index]}"`);
    }

    repos.push("repo(" + repoEl.join(",") + ")");
  }

  return repos
}

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
          repos = processTable(child);
          break;
        default:
          // skip
      }
    }
  }

  return repos;
}
