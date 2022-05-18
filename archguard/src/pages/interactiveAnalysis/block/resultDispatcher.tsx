import { ReplResult } from "@/types/archdoc";
import { graphRender } from "@/pages/interactiveAnalysis/block/graphRender";
import React from "react";

export function ResultDispatcher(result: ReplResult) {
  if (!result) return;

  if (!result.isArchdocApi) {
    return <>{ JSON.stringify(result) }</>;
  }

  if (result.action && result.action["graphType"]) {
    switch (result.action.graphType) {
      case "archdoc":
        return <div>{ graphRender(result.action.data) }</div>;
    }
  }

  return <></>;
}
