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

export default function GraphOperation(props) {
  const { cy, graphData, graphLayout, graphLayoutCallBack, measurements, nodeLabel } = props;

  const [ownGraphLayout, setOwnGraphLayout] = useState(graphLayout);
  const [loopPaths, setLoopPaths] = useState([]);

  useEffect(() => {
    setOwnGraphLayout(graphLayout);
  }, [graphLayout]);

  useEffect(() => {
    const edges = graphData?.edges;
    const paths = findLoopPaths(edges);
    setLoopPaths(paths);
  }, [graphData]);

  const graphNodeMap = useMemo(() => {
    const nodes = graphData?.nodes;
    return reduce(
      nodes,
      (nodeMap, node) => {
        nodeMap[node.id] = node;
        return nodeMap;
      },
      {},
    );
  }, [graphData]);

  function onGraphLayoutChange(graphLayout) {
    const newGraphLayout = { ...ownGraphLayout, ...graphLayout };
    setOwnGraphLayout(newGraphLayout);
    drawByLayout(cy, newGraphLayout);
    graphLayoutCallBack(newGraphLayout);
  }

  function onShowLoop(index) {
    const path = loopPaths[index];
    showLoop(cy, path);
  }

  function onMeasurementsChange(measurement) {
    const nodesSize = {};
    const dataKey = measurements.dataKey || "id";
    const nodeKey = measurements.nodeKey || dataKey;
    measurements.data.forEach((item) => {
      nodesSize[item[dataKey]] = item[measurement] * 1000 + "%";
    });
    resetNodeSize(cy, nodesSize, nodeKey);
  }

  function onResetStyle() {
    resetDefaultStyle(cy);
  }

  function onNodeLabelChange(type) {
    resetNodeLabel(cy, (fullName) => nodeLabel.setLabel(fullName, type));
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
          { label: "宽松", value: true },
          { label: "紧缩", value: false },
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
        onChange={(value) => onShowLoop(value)}
      />
      {measurements && (
        <Select
          placeholder={measurements.label}
          options={measurements.options}
          onChange={(value) => onMeasurementsChange(value)}
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
