import React from "react";
import { FlowChart } from "@/pages/interactiveAnalysis/block/graph/FlowChart";

export function graphRender(dataStr: string, uml: string) {
  // todo: add uml support
  return FlowChart(dataStr);
}
