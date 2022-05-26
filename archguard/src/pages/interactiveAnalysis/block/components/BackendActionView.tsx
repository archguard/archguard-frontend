import React, { useCallback, useState } from "react";
import { BackendAction } from "@/pages/interactiveAnalysis/InteractiveToBackend";
import { Button } from "antd";
import { BlockTable } from "@/pages/interactiveAnalysis/block/components/BlockTable";
import { JsonView } from "@/pages/interactiveAnalysis/block/components/JsonView";

export enum BackendActionType {
  CreateRepos,
  CreateScan,
}

interface BackendActionProps {
  data: any;
  actionType: BackendActionType;
}

export function BackendActionView(props: BackendActionProps) {
  const [result, setResult] = useState(null);

  const createAction = useCallback(() => {
    switch (props.actionType) {
      case BackendActionType.CreateRepos:
        BackendAction.createRepos(props.data).then(setResult);
        break;
      case BackendActionType.CreateScan:
        BackendAction.createScan(props.data).then(setResult);
        break;
    }
  }, [props.data]);

  return (
    <div>
      <Button type="primary" onClick={createAction}>
        Create
      </Button>
      {props.data.length && <BlockTable data={props.data} />}
      <p> DSL result: <JsonView data={props.data}/></p>
      {result && <p>Backend Result: <JsonView data={result} /></p>}
    </div>
  );
}
