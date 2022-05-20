import { ErrorContent, MsgType, ReplResult } from "@/types/archdoc";
import { graphRender } from "@/pages/interactiveAnalysis/block/graphRender";
import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

export function ResultDispatcher(result: ReplResult) {
  if (!result) return;

  switch (result.msgType) {
    case MsgType.ERROR:
      // eslint-disable-next-line no-case-declarations
      const errorContent = result.content as ErrorContent
      return <>
        <p><Text type="danger">{ errorContent.exception }</Text></p>
        <p><Text type="code">{ errorContent.message }</Text></p>
      </>
    case MsgType.None:
      break;
    case MsgType.ARCHGUARD_GRAPH:
      break;
  }

  if (result.action && result.action["graphType"]) {
    switch (result.action.graphType) {
      case "uml":
        return <div>{graphRender(result.action.data, "uml")}</div>;
      case "archdoc":
        return <div>{graphRender(result.action.data, "flowchart")}</div>;
    }
  }

  return <>{JSON.stringify(result)}</>;
}
