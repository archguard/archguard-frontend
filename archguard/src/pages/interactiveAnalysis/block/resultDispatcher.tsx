import { ErrorContent, MsgType, ReplResult } from "@/types/archdoc";
import React from "react";
import { Typography } from "antd";
import { BlockTable } from "@/pages/interactiveAnalysis/block/components/BlockTable";
import { GraphRender } from "@/pages/interactiveAnalysis/block/GraphRender";

const { Text } = Typography;

export function ResultDispatcher(result: ReplResult) {
  if (!result) return;

  switch (result.msgType) {
    case MsgType.ERROR:
      // eslint-disable-next-line no-case-declarations
      const errorContent = result.content as ErrorContent;
      return (
        <>
          <p>
            <Text type="danger">{errorContent.exception}</Text>
          </p>
          <p>
            <Text type="code">{errorContent.message}</Text>
          </p>
        </>
      );
    case MsgType.None:
      break;
    case MsgType.ARCHGUARD_GRAPH:
      break;
  }

  if (result.action && result.action["graphType"]) {
    return <GraphRender result={result} />;
  }

  if (result.className == "java.util.ArrayList") {
    let tableData = JSON.parse(result.resultValue);
    return (
      <>
        <p>{JSON.stringify(result)}</p>
        <BlockTable data={tableData} />
      </>
    );
  }

  return <>{JSON.stringify(result)}</>;
}
