import mermaidWrapper from "@/pages/interactiveAnalysis/block/graph/mermaidWrapper";
import React from "react";

export function graphRender(dataStr: string) {
  let data = JSON.parse(dataStr);

  let def = "";
  for (let datum of data) {
    def += datum.source + "-->" + datum.target + ";\n";
  }

  return (
    <>
      { mermaidWrapper.mermaid({
        node: {
          key: "mermaid",
          definition: `graph TD;
   ${ def }`
        }
      }) }
    </>
  );
}
