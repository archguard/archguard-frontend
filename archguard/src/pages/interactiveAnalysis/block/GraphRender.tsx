import React, { useState } from "react";
import { FlowChart } from "@/pages/interactiveAnalysis/block/graph/FlowChart";
import { GraphType, ReplResult } from "@/types/archdoc";

export function GraphRender(props: { result: ReplResult }) {
  const [result] = useState(props.result);

  switch (result.action.graphType) {
    case GraphType.ARCHDOC:
      return <>{FlowChart(result.action.data)}</>;
    case GraphType.UML:
      return <div></div>;
  }

  return <div> unsupported GraphType: {result.action.graphType}</div>;
}
