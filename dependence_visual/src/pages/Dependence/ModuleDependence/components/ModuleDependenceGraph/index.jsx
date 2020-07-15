import { Button } from "antd";
import { queryAllModuleDependence } from "api/module/module";
import CollapsibleCard from "components/CollapsibleCard";
import InvokeGraph from "components/InvokeGraph";
import React, { useState } from "react";
import { couplings } from "../../config";
import useModuleCoupling from "../../globalStates/useModuleCoupling";
import useSelectedNode from "../../globalStates/useSelectedNode";

function transformData(data) {
  data.nodes = data.nodes.map((item) => ({
    id: item.id,
    title: item.name,
    properties: {},
  }));
  data.edges = data.edges.map((item) => ({
    a: item.a,
    b: item.b,
    labels: [item.num],
  }));
  return data;
}

function getMeasurements(moduleCoupling) {
  if (!moduleCoupling || moduleCoupling.length === 0) return;
  const measurements = {};
  measurements.label = "模块耦合度";
  measurements.options = moduleCoupling && couplings;
  measurements.data = moduleCoupling;
  measurements.dataKey = "moduleName";
  measurements.nodeKey = "fullName";
  return measurements;
}

function ModuleDependenceGraph() {
  const [graphData, setGraphData] = useState();
  const [moduleCoupling] = useModuleCoupling();
  const [selectedNode] = useSelectedNode();

  function showAllModuleDependence() {
    queryAllModuleDependence().then((res) => {
      setGraphData(transformData(res));
    });
  }

  return (
    <CollapsibleCard title="模块间依赖">
      <Button
        type="primary"
        onClick={() => showAllModuleDependence()}
        style={{ marginBottom: "16px" }}
      >
        查询
      </Button>
      <InvokeGraph
        id="moduleDependenceGraph"
        data={graphData}
        selectedNode={selectedNode}
        measurements={getMeasurements(moduleCoupling)}
      />
    </CollapsibleCard>
  );
}

export default ModuleDependenceGraph;
