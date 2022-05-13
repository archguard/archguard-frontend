import { Graph, GraphOptions } from "@antv/g6";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useMeasure } from "react-use";
import { create } from "./graph";

interface GraphViewProps {
  data?: any;
  options?: Partial<GraphOptions>;
  onInit(graph: Graph): void;
}

export default function GraphView(props: GraphViewProps) {
  const { options, onInit } = props;
  const graphRef = useRef();
  const [containerRef, { width, height }] = useMeasure();
  const [graph, setGraph] = useState<Graph>();

  useEffect(() => {
    if (graphRef.current) {
      const refDom = ReactDOM.findDOMNode(graphRef.current) as HTMLElement;
      const graph = create(refDom, options);
      setGraph(graph);
      onInit && onInit(graph);
    }
  }, [graphRef.current]);

  useEffect(() => {
    if (graph) {
      graph.changeSize(width, height);
      graph.render();
    }
  }, [graph, width, height]);

  return (
    <div
      ref={containerRef as any}
      className="graph-container"
      style={{ width: "100%", height: "100%" }}
    >
      <div ref={graphRef as any} />
    </div>
  );
}
