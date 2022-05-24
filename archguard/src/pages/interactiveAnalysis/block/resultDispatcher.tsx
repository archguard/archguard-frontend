import { ActionType, ErrorContent, MsgType, ReplResult } from "@/types/archdoc";
import React from "react";
import { Typography } from "antd";
import { BlockTable } from "@/pages/interactiveAnalysis/block/components/BlockTable";
import { GraphRender } from "@/pages/interactiveAnalysis/block/GraphRender";
import {
  BackendAction,
  BackendActionType,
} from "@/pages/interactiveAnalysis/block/components/BackendAction";
import { JsonView } from "@/pages/interactiveAnalysis/block/components/JsonView";

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
    const data = JSON.parse(result.action.data);
    switch (result.action.actionType) {
      case ActionType.CREATE_REPO:
        return <BackendAction data={data} actionType={BackendActionType.CreateRepos} />;
      case ActionType.GRAPH:
        return <GraphRender result={result} />;
    }
  }

  // display array for objects
  if (result.className == "java.util.ArrayList") {
    let tableData = JSON.parse(result.resultValue);
    return (
      <>
        <BlockTable data={tableData} />
        <JsonView data={result}/>
      </>
    );
  }

  return <>{JSON.stringify(result)}</>;
}
