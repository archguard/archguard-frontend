import mermaidWrapper from "@/pages/interactiveAnalysis/block/mermaid/mermaidWrapper";
import React from "react";

function flowChart(dataStr: string) {
  let data = JSON.parse(dataStr);

  let def = "";
  for (let datum of data) {
    def += datum.source + "-->" + datum.target + ";\n";
  }

  return (
    <>
      {mermaidWrapper.mermaid({
        node: {
          key: "mermaid",
          definition: `graph TD;
   ${def}`,
        },
      })}
    </>
  );
}

export function graphRender(dataStr: string, uml: string) {
  // todo: add uml support
  return flowChart(dataStr);
}
