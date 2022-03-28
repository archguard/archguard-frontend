import React, { useState } from "react";
import { Button } from "antd";
import InvokeGraph from "@/components/Business/InvokeGraph";
import { moduleMapping } from "@/pages/metrics/ModuleCouplingTree/Report";
import { queryAllModuleDependence } from "@/api/module/module";
import useModuleCoupling from "../../globalStates/useModuleCoupling";
import useSelectedNode from "../../globalStates/useSelectedNode";
import { buildModuleDependenceTree, generateNodeEdges } from "../../../utils";
import { GraphData } from "@/models/graph";
import { SourceCodeItem } from "@/models/java";
import CollapsibleCard from "@/components/Business/CollapsibleCard";

export interface Measurements {
  label: string;
  options: { label: string; value: string }[];
  data: any[];
  dataKey: string;
  nodeKey: string;
}

function transformData(data: any): GraphData<SourceCodeItem> {
  data.nodes = data.nodes.map((item: any) => ({
    id: item.id,
    title: item.name,
    properties: {},
  }));
  data.edges = data.edges.map((item: any) => ({
    a: item.a,
    b: item.b,
    labels: [item.num],
  }));
  return data;
}

function getMeasurements(moduleCoupling?: any): Measurements | undefined {
  if (!moduleCoupling || moduleCoupling.length === 0) return;
  const couplingOptions = Object.keys(moduleMapping).map((item) => ({
    label: moduleMapping[item].name,
    value: item,
  }));
  return {
    label: "模块耦合度",
    options: couplingOptions,
    data: moduleCoupling,
    dataKey: "moduleName",
    nodeKey: "fullName",
  };
}

function ModuleDependenceGraph() {
  const [graphData, setGraphData] = useState<GraphData<SourceCodeItem>>();
  const [moduleCoupling] = useModuleCoupling();
  const [selectedNode] = useSelectedNode();

  function showAllModuleDependence() {
    queryAllModuleDependence().then((res: any) => {
      const tree = buildModuleDependenceTree(res);
      const nodeEdges = generateNodeEdges(tree);
      setGraphData(nodeEdges);
    });
  }

  return (
    <CollapsibleCard title="模块间依赖" collapsed={true}>
      <Button
        type="primary"
        onClick={() => showAllModuleDependence()}
        style={{ marginBottom: "16px" }}
      >
        查询
      </Button>
      <InvokeGraph
        id="moduleDependenceGraph"
        data={graphData!}
        selectedNode={selectedNode}
        measurements={getMeasurements(moduleCoupling)}
      />
    </CollapsibleCard>
  );
}

export default ModuleDependenceGraph;
