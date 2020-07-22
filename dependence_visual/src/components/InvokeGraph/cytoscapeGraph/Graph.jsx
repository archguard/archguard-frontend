import React, { useState, useEffect, useMemo, useCallback } from "react";
import { scrollToAnchor } from "@/utils/anchor";
import { useMount } from "ahooks";
import { message } from "antd";
import FullscreenContainer from "../../FullscreenContainer";
import { filterDataWithConfig } from "../utils";
import GraphOperation from "./components/GraphOperation";
import { drawByData, initCytoscape, showHighlightBrachNode } from "./drawGraph";
import { transform } from "./transform";
import {
  buildDependenceTree,
  getVisibleTreeNodeByDeep,
  expandNode,
  collpaseNode,
} from "./components/GraphOperation/utils";

export default function Graph(props) {
  const { id, data, title, configs, measurements, selectedNode, nodeLabel } = props;

  const [cy, setCy] = useState();
  const [graphLayout, setGraphLayout] = useState({
    name: "elk",
    nodeDimensionsIncludeLabels: true,
    fit: true,
  });

  const { dependenceTree, nodeEdges } = useMemo(() => {
    const dependenceTree = buildDependenceTree(data);
    const nodeEdges = getVisibleTreeNodeByDeep(dependenceTree, 2);
    return {
      dependenceTree,
      nodeEdges,
    };
  }, [data]);

  const onNodeClick = useCallback(
    (event) => {
      const node = event.target.data();
      const { id, children } = node;
      const hasChild = children && children.length > 0;
      if (hasChild) {
        const firstChild = children[0];
        const isExpand = firstChild.visible;
        const newNodeEdges = isExpand ? collpaseNode(node, nodeEdges) : expandNode(node, nodeEdges);
        // drawByData(cy, transform(filterDataWithConfig(newNodeEdges, configs)), graphLayout, title);
      }
    },
    [dependenceTree],
  );

  const onEvent = { cxttap: () => message.success("复制成功") };
  useMount(() => {
    console.log("init cy");
    setCy(initCytoscape(id, onEvent));
  }, []);

  useEffect(() => {
    console.log("nodeEdges", dependenceTree, nodeEdges);
    drawByData(cy, transform(filterDataWithConfig(nodeEdges, configs)), graphLayout, title);
    if (cy) {
      cy.on("tap", "node", onNodeClick);
    }
    return () => {
      cy && cy.off("tap", "node", onNodeClick);
    };
  }, [dependenceTree, title, graphLayout, configs]);

  useEffect(() => {
    if (!selectedNode) return;
    const data = selectedNode.data;
    const key = selectedNode.key || "id";
    if (!data) return;
    const selectedElement = cy.filter((e) => e.data(key) === data)[0];
    if (!selectedElement) return;
    showHighlightBrachNode(cy, selectedElement);
    scrollToAnchor(id);
  }, [selectedNode, cy, id]);

  return (
    <FullscreenContainer
      style={{
        height: 600,
        border: "1px solid #f4f4f4",
        display: data && data.nodes ? undefined : "none",
      }}
    >
      <GraphOperation
        cy={cy}
        graphData={data}
        graphLayout={graphLayout}
        graphLayoutCallBack={(graphLayout) => setGraphLayout(graphLayout)}
        measurements={measurements}
        nodeLabel={nodeLabel}
      />
      <div
        id={id}
        style={{
          height: "100%",
          minHeight: 500,
          width: "100%",
        }}
      ></div>
    </FullscreenContainer>
  );
}
