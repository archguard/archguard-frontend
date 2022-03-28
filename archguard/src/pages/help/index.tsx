import React from "react";
import ReactMarkdown from "react-markdown";
import MarkdownNavbar from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import { useParams } from "umi";

const docs = {
  index: require("./docs/index.md").default,
  "module-coupling": require("./docs/module-coupling.md").default,
};

export default function Help() {
  const { name = "index" } = useParams<{ name: "index" | "module-coupling" }>();
  const doc = docs[name];

  // @ts-ignore
  return (
    <div>
      <MarkdownNavbar source={doc} />
      <ReactMarkdown children={doc}/>
    </div>
  );
}
