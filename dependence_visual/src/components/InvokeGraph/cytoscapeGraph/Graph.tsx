import React, { useState, useEffect, useMemo, useCallback } from "react";
import { scrollToAnchor } from "@/utils/anchor";
import { useMount } from "ahooks";
import { message } from "antd";
import FullscreenContainer from "../../fullscreen-container/index";
import { filterDataWithConfig } from "../utils";
import GraphOperation from "./components/GraphOperation";
import { drawByData, initCytoscape, showHighlightBrachNode } from "./drawGraph";
import { transform } from "./transform";
import {
  buildDependenceTree,
  getVisibleTreeNodeByDeep,
  expandNode,
  collapseNode,
  isExpand,
  NodesEdges,
} from "./components/GraphOperation/utils";
import { Measurements } from "@/pages/analysis/dependence/ModuleDependence/components/ModuleDependenceGraph";
import { Core, LayoutOptions } from "cytoscape";
import { GraphData } from "../../../models/graph";

type Option = {
  label: string;
  value: string;
};
export interface NodeLabel {
  placeholder: string;
  options: Option[];
  setLabel: Function;
}

interface GraphProps {
  id: string;
  data: GraphData;
  title?: string;
  configs?: any;
  measurements?: Measurements;
  selectedNode?: any;
  nodeLabel?: NodeLabel;
  deep?: number;
}

export default function Graph(props: GraphProps) {
  const { id, data, title = "", configs, measurements, selectedNode, nodeLabel, deep } = props;
  const [cy, setCy] = useState<Core>();
  const [graphLayout, setGraphLayout] = useState<LayoutOptions>({
    name: "elk",
    nodeDimensionsIncludeLabels: true,
    fit: true,
  });
  const [visibleNodeEdges, setNodeEdges] = useState(new NodesEdges());

  const dependenceTree = useMemo(() => {
    return buildDependenceTree(data || {});
  }, [data]);

  const onNodeClick = useCallback(
    (event) => {
      const node = event.target.data();
      const { children } = node;
      const hasChild = children && children.length > 0;
      if (hasChild) {
        const isNodeExpand = isExpand(node, visibleNodeEdges.edges);
        const newNodeEdges = isNodeExpand
          ? collapseNode(node, visibleNodeEdges)
          : expandNode(node, visibleNodeEdges);
        setNodeEdges(newNodeEdges);
        drawByData(cy, transform(filterDataWithConfig(newNodeEdges, configs)), graphLayout, title);
      }
    },
    [visibleNodeEdges],
  );

  const onEvent = { cxttap: () => message.success("复制成功") };
  useMount(() => {
    console.log("init cy");
    setCy(initCytoscape(id, onEvent));
  });

  useEffect(() => {
    if (cy) {
      cy.on("tap", "node", onNodeClick);
      return () => {
        cy.off("tap", "node", onNodeClick);
      };
    }
  }, [visibleNodeEdges]);

  useEffect(() => {
    const visibleNodeEdges = getVisibleTreeNodeByDeep(dependenceTree, deep || 0);
    drawByData(cy, transform(filterDataWithConfig(visibleNodeEdges, configs)), graphLayout, title);
    setNodeEdges(visibleNodeEdges);
  }, [dependenceTree, title, graphLayout, configs, deep]);

  useEffect(() => {
    if (!selectedNode) return;
    const data = selectedNode.data;
    const key = selectedNode.key || "id";
    if (!data || !cy) return;
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
        graphData={visibleNodeEdges}
        graphLayout={graphLayout}
        graphLayoutCallBack={(graphLayout: LayoutOptions) => setGraphLayout(graphLayout)}
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
