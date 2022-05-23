import { ActionType, ErrorContent, MsgType, ReplResult } from "@/types/archdoc";
import React from "react";
import { Button, Typography } from "antd";
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
      return <>{JSON.stringify(result)}</>;

    case MsgType.ARCHGUARD_GRAPH:
      break;
  }

  if (result.action) {
    switch (result.action.actionType) {
      case ActionType.CREATE_REPO:
        // eslint-disable-next-line no-case-declarations
        let tableData = JSON.parse(result.action.data);
        // eslint-disable-next-line no-case-declarations
        const clickRepos = (event: any) => {
          console.log(tableData);
        };

        return (
          <div>
            <Button type="primary" onClick={clickRepos}>Create</Button>
            <BlockTable data={tableData} />
          </div>
        );
      case ActionType.GRAPH:
        return <GraphRender result={result} />;
    }
  }

  // display array for objects
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
