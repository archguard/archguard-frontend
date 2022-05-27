import { ActionType, ErrorContent, MsgType, ReplResult } from "@/types/ascode";
import React from "react";
import { Typography } from "antd";
import { BlockTable } from "@/pages/interactiveAnalysis/block/components/BlockTable";
import { GraphRender } from "@/pages/interactiveAnalysis/block/GraphRender";
import {
  BackendActionView,
  BackendActionType,
} from "@/pages/interactiveAnalysis/block/components/BackendActionView";
import { JsonView } from "@/pages/interactiveAnalysis/block/components/JsonView";
import { InteractiveAnalysisContext } from "@/pages/interactiveAnalysis/InteractiveAnalysisContext";

const { Text } = Typography;

export function ResultDispatcher(result: ReplResult, context: InteractiveAnalysisContext) {
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
        return <BackendActionView data={data} actionType={BackendActionType.CreateRepos} />;
      case ActionType.CREATE_SCAN:
        return <BackendActionView data={data} actionType={BackendActionType.CreateScan} />;
      case ActionType.GRAPH:
        return <GraphRender result={result} context={context}/>;
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
