import React, { useCallback, useState } from "react";
import { RepoAction } from "@/pages/interactiveAnalysis/InteractiveToBackend";
import { Button } from "antd";
import { BlockTable } from "@/pages/interactiveAnalysis/block/components/BlockTable";

export enum BackendActionType {
  CreateRepos,
}

interface BackendActionProps {
  data: any;
  actionType: BackendActionType;
}

export function BackendAction(props: BackendActionProps) {
  const [result, setResult] = useState(null);

  const clickCreateRepos = useCallback(() => {
    RepoAction.create(props.data).then(setResult);
  }, [props.data]);

  return (
    <div>
      <Button type="primary" onClick={clickCreateRepos}>
        Create
      </Button>
      <BlockTable data={props.data} />
      {result && <div>RESPONSE: {JSON.stringify(result)}</div>}
    </div>
  );
}
