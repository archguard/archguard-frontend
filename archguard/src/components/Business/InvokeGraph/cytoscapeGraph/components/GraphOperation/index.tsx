import React, { useEffect, useState, useMemo } from "react";
import { reduce } from "lodash";
import { Select, Button } from "antd";
import "./index.less";
import { graphLayoutOptions } from "./config";
import {
  drawByLayout,
  resetDefaultStyle,
  showLoop,
  resetNodeSize,
  resetNodeLabel,
} from "../../drawGraph";
import { findLoopPaths } from "./utils";
import { Core } from "cytoscape";
import { Measurements } from "@/pages/dependence/ModuleDependence/components/ModuleDependenceGraph";
import { NodeLabel } from "../../Graph";
import { SelectValue } from "antd/lib/select";
import { GraphData } from "@/models/graph";
import { SourceCodeItem } from "@/models/java";

interface GraphOperationProps {
  cy?: Core;
  graphData?: GraphData<SourceCodeItem>;
  graphLayout: any;
  graphLayoutCallBack?: Function;
  measurements?: Measurements;
  nodeLabel?: NodeLabel;
  showAllSelect?: boolean;
  graphDataCallBack?: Function;
}

export default function GraphOperation(props: GraphOperationProps) {
  const {
    cy,
    graphData,
    graphLayout,
    graphLayoutCallBack,
    measurements,
    nodeLabel,
    showAllSelect,
    graphDataCallBack,
  } = props;

  const [ownGraphLayout, setOwnGraphLayout] = useState(graphLayout);
  const [loopPaths, setLoopPaths] = useState<string[][]>([])
  const [nodeLabelFormate, setNodeLabelFormate] = useState<SelectValue>()
  const [showAllNodes, setShowAllNodes] = useState<SelectValue>()

  useEffect(() => {
    setOwnGraphLayout(graphLayout);
  }, [graphLayout]);

  useEffect(() => {
    const edges = graphData?.edges || [];
    const paths = findLoopPaths(edges);
    setLoopPaths(paths);
    setNodeLabelFormate(undefined)
    setShowAllNodes(undefined)
  }, [graphData]);

  const graphNodeMap = useMemo(() => {
    const nodes = graphData?.nodes;
    return reduce(
      nodes,
      (nodeMap: any, node) => {
        nodeMap[node.id] = node;
        return nodeMap;
      },
      {},
    );
  }, [graphData]);

  function onGraphLayoutChange(graphLayout: any) {
    const newGraphLayout = { ...ownGraphLayout, ...graphLayout };
    setOwnGraphLayout(newGraphLayout);
    drawByLayout(cy!, newGraphLayout);
    graphLayoutCallBack && graphLayoutCallBack(newGraphLayout);
  }

  function onShowLoop(index: number) {
    const path = loopPaths[index];
    showLoop(cy!, path);
  }

  function onMeasurementsChange(measurement: string) {
    if (!measurements) return;

    const nodesSize: any = {};
    const dataKey = measurements.dataKey || "id";
    const nodeKey = measurements.nodeKey || dataKey;
    measurements.data.map((item: any) => {
      return (nodesSize[item[dataKey]] = item[measurement] * 1000 + "%");
    });
    resetNodeSize(cy!, nodesSize, nodeKey);
  }

  function onResetStyle() {
    resetDefaultStyle(cy!);
  }

  function onNodeLabelChange(type: SelectValue) {
    if (!nodeLabel) return;
    setNodeLabelFormate(type)
    resetNodeLabel(cy!, (fullName: string) => nodeLabel.setLabel(fullName, type));
    drawByLayout(cy!, graphLayout);
  }

  function showAllOnClick() {
    graphDataCallBack && graphDataCallBack(graphData);
  }

  function showOnlyHasModuleOnClick() {
    const newNodes = graphData?.nodes.filter((item) => item.module && item.module != 'null');
    const newNodeIds = newNodes?.map(item => item.id)
    const newEdges = graphData?.edges.filter(item => newNodeIds?.includes(item.source) && newNodeIds.includes(item.target))

    graphDataCallBack && graphDataCallBack({ nodes: newNodes, edges: newEdges });
  }

  function showAllSelectOnChange(value: SelectValue) {
    setShowAllNodes(value)
    if (value == "all") {
      showAllOnClick()
    }
    if (value == "only") {
      showOnlyHasModuleOnClick()
    }
  }

  return (
    <div className="graph-operation">
      <Select
        defaultValue={ownGraphLayout.name}
        options={graphLayoutOptions.map((item) => ({
          label: item + "布局",
          value: item,
        }))}
        onChange={(value) => onGraphLayoutChange({ name: value })}
      />
      <Select
        placeholder="显示循环"
        dropdownClassName="loop-node-select"
        options={loopPaths.map((pathNodeIds, index) => {
          const firstNodeId = pathNodeIds[pathNodeIds.length - 1];
          const lastNodeId = pathNodeIds[0];
          const firstNode = graphNodeMap[firstNodeId] || {};
          const lastNode = graphNodeMap[lastNodeId] || {};
          return {
            label: `循环: ${firstNode.name} -> ${lastNode.name}`,
            value: index,
          };
        })}
        onChange={(value: number) => onShowLoop(value)}
      />
      {measurements && (
        <Select
          placeholder={measurements.label}
          options={measurements.options}
          onChange={(value: string) => onMeasurementsChange(value)}
        />
      )}
      {nodeLabel && (
        <Select
          placeholder={nodeLabel.placeholder}
          options={nodeLabel.options}
          value={nodeLabelFormate}
          onChange={(value) => onNodeLabelChange(value)}
        />
      )}
      <Button onClick={() => onResetStyle()}>恢复颜色{measurements && "/大小"}</Button>
      {showAllSelect && (
        <Select
          placeholder="是否排除第三方库"
          options={[
            { label: "排除第三方库", value: "only" },
            { label: "展示全部", value: "all" },
          ]}
          value={showAllNodes}
          onChange={(value) => showAllSelectOnChange(value)}
        />
      )}
    </div>
  );
}
