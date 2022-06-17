import React, { useState, useEffect, useCallback } from "react";
import { scrollToAnchor } from "@/utils/utils";
import { message} from "antd";
import { find } from "lodash";
import { filterDataWithConfig } from "../utils";
import GraphOperation from "./components/GraphOperation";
import { drawByData, initCytoscape, showHighlightBrachNode } from "./drawGraph";
import { transform } from "./transform";
import { expandNode, collapseNode, isExpand } from "./components/GraphOperation/utils";
import { Core, LayoutOptions } from "cytoscape";
import { GraphData } from "@/types/graph";
import { SourceCodeItem } from "@/types/java";
import FullscreenContainer from "@/components/Business/FullscreenContainer";
import { Measurements } from "@/types/measurements";
import { useMount } from "react-use";

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
  data: GraphData<SourceCodeItem>;
  title?: string;
  configs?: any;
  measurements?: Measurements;
  selectedNode?: any;
  nodeLabel?: NodeLabel;
  deep?: number;
  systemId: number;
  showAllSelect?: boolean;
}

export default function Graph(props: GraphProps) {
  const {
    id,
    data,
    title = "",
    configs,
    measurements,
    selectedNode,
    nodeLabel,
    deep,
    showAllSelect,
  } = props;
  const [cy, setCy] = useState<Core>();
  const [graphLayout, setGraphLayout] = useState<LayoutOptions>({
    name: "fcose",
    nodeDimensionsIncludeLabels: true,
    fit: true,
  });
  const [visibleNodeEdges, setNodeEdges] = useState<GraphData<SourceCodeItem>>({ nodes: [], edges: [] });

  const onNodeClick = useCallback(
    (event) => {
      const node = event.target.data();
      const { id } = node;
      const { nodes, edges } = visibleNodeEdges;
      const treeNode = find(nodes, (item) => item.id === id);
      const hasChild = treeNode!.children && treeNode!.children.length > 0;
      if (hasChild) {
        const isNodeExpand = isExpand(node, edges);
        const newNodeEdges = isNodeExpand
          ? collapseNode(treeNode!, visibleNodeEdges)
          : expandNode(treeNode!, visibleNodeEdges);
        setNodeEdges(newNodeEdges);
        // @ts-ignore
        drawByData(cy, transform(filterDataWithConfig(newNodeEdges, configs)), graphLayout, title);
      }
    },
    [visibleNodeEdges],
  );

  const onEvent = { cxttap: () => message.success("复制成功") };
  useMount(() => {
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
    setNodeEdges(data);
    drawByData(cy, transform(filterDataWithConfig(data as any, configs)), graphLayout, title);
  }, [data, title, graphLayout, configs, deep]);

  useEffect(() => {
    if (!selectedNode) return;
    const data = selectedNode.data;
    const key = selectedNode.key || "id";
    if (!data || !cy) return;
    const selectedElement = cy.filter(
      (e: { data: (key: string) => string }) => e.data(key) === data,
    )[0];
    if (!selectedElement) return;
    showHighlightBrachNode(cy, selectedElement);
    scrollToAnchor(id);
  }, [selectedNode, cy, id]);

  return (
    <FullscreenContainer
      style={{
        height: 800,
        border: "1px solid #f4f4f4",
        display: data && data.nodes ? undefined : "none",
      }}
    >
      <GraphOperation
        cy={cy!}
        graphData={visibleNodeEdges}
        graphLayout={graphLayout}
        graphLayoutCallBack={(graphLayout: LayoutOptions) => setGraphLayout(graphLayout)}
        measurements={measurements}
        nodeLabel={nodeLabel}
        showAllSelect={showAllSelect}
        graphDataCallBack={(newNodeEdges: GraphData<SourceCodeItem>) =>
          // @ts-ignore
          drawByData(cy, transform(filterDataWithConfig(newNodeEdges, configs)), graphLayout, title)
        }
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
