import React, { useState } from "react";
import { FlowChart } from "@/pages/interactiveAnalysis/block/graph/FlowChart";
import { ReplResult } from "@/types/archdoc";

export function GraphRender(props: { result: ReplResult }) {
  const [result] = useState(props.result);

  switch (result.action.graphType) {
    case "uml":
      return <div></div>;
  }

  return <>{FlowChart(result.action.data)}</>;
}
