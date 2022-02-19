import React, { useState, useEffect } from "react";
import G6, { Graph } from "@antv/g6";
import GraphView from "@/components/Business/GraphView";
import { ELKLayout } from "@/components/Business/GraphView/layout/elk";
import { G6GraphData } from "@/models/graph";
import { NodeConfig } from "@antv/g6/es/types";
import FullscreenContainer from '@/components/Business/FullscreenContainer';

const defaultGraphOptions = {
  modes: {
    default: ["drag-canvas", "zoom-canvas", "drag-node"],
  },
  defaultNode: {
    size: 26,
    anchorPoints: [[0.5, 0.5]],
    labelCfg: {
      position: "top",
    },
    style: {
      fill: "#C6E5FF",
      stroke: "#5B8FF9",
    },
  },
  defaultEdge: {
    type: "line",
    style: {
      stroke: "#A3B1BF",
      endArrow: {
        path: G6.Arrow.vee(10, 12, 5),
      },
    },
  },
};

export default function GraphComponent(props: { graphData: G6GraphData }) {
  const { graphData } = props;
  const [graph, setGraph] = useState<Graph>();
  useEffect(() => {
    if (graph && graphData) {
      new ELKLayout().layout(graphData).then(() => {
        graph.data(graphData);
        graph.render();
        graph.fitView();
      });
      graph.node((node: NodeConfig) => {
        return {
          id: node.id,
          label: node.name,
          size: [20],
        } as Partial<NodeConfig>;
      });
    }
  }, [graph, graphData]);
  return (
    <FullscreenContainer
      style={{
        height: 600,
        border: "1px solid #f4f4f4",
        display: graphData ? undefined : "none",
      }}
    >
      <GraphView onInit={setGraph} options={{ ...defaultGraphOptions }}></GraphView>
    </FullscreenContainer>
  );
}
