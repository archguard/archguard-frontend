import mermaidWrapper from "@/pages/interactiveAnalysis/block/graph/mermaid/mermaidWrapper";
import React from "react";

export function FlowChart(dataStr: string) {
  let data = JSON.parse(dataStr);

  let def = "";
  for (let datum of data) {
    def += datum.source + "-->" + datum.target + ";\n";
  }

  return (
    <div>
      { mermaidWrapper.mermaid({
        node: {
          key: "mermaid",
          definition: `graph TD;
   ${ def }`
        }
      }) }
    </div>
  );
}
