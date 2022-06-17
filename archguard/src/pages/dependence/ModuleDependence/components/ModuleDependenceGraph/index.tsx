import React, { useState } from "react";
import { Button } from "antd";
import InvokeGraph from "@/components/Business/InvokeGraph";
import { moduleMapping } from "@/pages/system/metrics/ModuleCouplingTree/Report";
import { queryAllModuleDependence } from "@/api/module/module";
import useModuleCoupling from "../../globalStates/useModuleCoupling";
import useSelectedNode from "../../globalStates/useSelectedNode";
import { buildModuleDependenceTree, generateNodeEdges } from "../../../utils";
import { GraphData } from "@/types/graph";
import { SourceCodeItem } from "@/types/java";
import CollapsibleCard from "@/components/Business/CollapsibleCard";
import { Measurements } from "@/types/measurements";

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

interface ModuleDependenceGraphProps {
  systemId: number
}

function ModuleDependenceGraph(props: ModuleDependenceGraphProps) {
  const [graphData, setGraphData] = useState<GraphData<SourceCodeItem>>();
  const [moduleCoupling] = useModuleCoupling();
  const [selectedNode] = useSelectedNode();

  function showAllModuleDependence() {
    queryAllModuleDependence(props.systemId).then((res: any) => {
      const tree = buildModuleDependenceTree(res);
      const nodeEdges = generateNodeEdges(tree);
      setGraphData(nodeEdges);
    });
  }

  return (
    <CollapsibleCard title="模块间依赖" collapsed={ true }>
      <Button
        type="primary"
        onClick={ () => showAllModuleDependence() }
        style={ { marginBottom: "16px" } }
      >
        查询
      </Button>
      <InvokeGraph
        id="moduleDependenceGraph"
        data={ graphData! }
        selectedNode={ selectedNode }
        measurements={ getMeasurements(moduleCoupling) }
        systemId={ props.systemId }/>

    </CollapsibleCard>
  );
}

export default ModuleDependenceGraph;
