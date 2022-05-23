import React, { useCallback, useState } from "react";
import { FlowChart } from "@/pages/interactiveAnalysis/block/graph/FlowChart";
import { GraphType, ReplResult } from "@/types/archdoc";
import { Select } from "antd";

export function GraphSelect(props: { change: any; value: any }) {
  const changeGraph = useCallback(
    (option) => {
      props.change(option);
    },
    [props.change],
  );

  return (
    <Select onChange={changeGraph} value={props.value} style={{ width: 120 }}>
      {Object.keys(GraphType).map((value) => (
        <Select.Option value={GraphType[value]} key={GraphType[value]}>
          {GraphType[value]}
        </Select.Option>
      ))}
    </Select>
  );
}

export function GraphRenderByType(props: { type: string; data: string }) {
  const [type] = useState(props.type);

  switch (props.type) {
    case GraphType.ARCHDOC:
      return <div>{FlowChart(props.data)}</div>;
    case GraphType.UML:
      return <div> UML is doing </div>;
  }

  return <div> unsupported GraphType: {props.type}</div>;
}

export function GraphRender(props: { result: ReplResult }) {
  const [result] = useState(props.result);
  const [graphType, setGraphType] = useState(result.action.graphType);

  const changeGraph = useCallback(
    (option) => {
      setGraphType(option);
    },
    [setGraphType],
  );

  return (
    <>
      <GraphSelect value={graphType} change={changeGraph}></GraphSelect>
      <GraphRenderByType type={graphType} data={result.action.data} />
    </>
  );
}
