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
import { findLoopPaths, NodesEdges } from "./utils";
import { LayoutOptions, Core } from 'cytoscape';
import { Measurements } from '@/pages/analysis/dependence/ModuleDependence/components/ModuleDependenceGraph';
import { NodeLabel } from '../../Graph';
import { SelectValue } from 'antd/lib/select';

interface GraphOperationProps {
  cy: Core;
  graphData?: NodesEdges;
  graphLayout: any;
  graphLayoutCallBack?: Function;
  measurements?: Measurements;
  nodeLabel?: NodeLabel;
}

export default function GraphOperation(props: GraphOperationProps) {
  const { cy, graphData, graphLayout, graphLayoutCallBack, measurements, nodeLabel } = props;

  const [ownGraphLayout, setOwnGraphLayout] = useState(graphLayout);
  const [loopPaths, setLoopPaths] = useState<string[][]>([]);

  useEffect(() => {
    setOwnGraphLayout(graphLayout);
  }, [graphLayout]);

  useEffect(() => {
    const edges = graphData?.edges || []
    const paths = findLoopPaths(edges);
    setLoopPaths(paths);
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
    drawByLayout(cy, newGraphLayout);
    graphLayoutCallBack && graphLayoutCallBack(newGraphLayout);
  }

  function onShowLoop(index: number) {
    const path = loopPaths[index];
    showLoop(cy, path);
  }

  function onMeasurementsChange(measurement: string) {
    if (!measurements) return;

    const nodesSize: any = {};
    const dataKey = measurements.dataKey || "id";
    const nodeKey = measurements.nodeKey || dataKey;
    measurements.data.map((item: any) => {
      return nodesSize[item[dataKey]] = item[measurement] * 1000 + "%";
    });
    resetNodeSize(cy, nodesSize, nodeKey);
  }

  function onResetStyle() {
    resetDefaultStyle(cy);
  }

  function onNodeLabelChange(type: SelectValue) {
    if (!nodeLabel) return
    resetNodeLabel(cy, (fullName: string) => nodeLabel.setLabel(fullName, type));
    drawByLayout(cy, graphLayout);
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
        defaultValue={ownGraphLayout.nodeDimensionsIncludeLabels}
        options={[
          { label: "宽松", value: 1 },
          { label: "紧缩", value: 0 },
        ]}
        onChange={(value) => onGraphLayoutChange({ nodeDimensionsIncludeLabels: value })}
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
            label: `循环: ${firstNode.title} -> ${lastNode.title}`,
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
          onChange={(value) => onNodeLabelChange(value)}
        />
      )}
      <Button onClick={() => onResetStyle()}>恢复</Button>
    </div>
  );
}
