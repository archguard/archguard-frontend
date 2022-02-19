import React, { forwardRef, useEffect, useMemo, useRef, RefObject } from "react";
import ReactDOM from "react-dom";
import { useMeasure } from "react-use";
import "./index.less";
import "./packageGraphExtends";
import { createGraph } from "./packageGraphUtil";

interface PackageGraphProps {
  data: any;
}

const PackageGraph = forwardRef((props: PackageGraphProps, ref: any) => {
  const { data } = props;
  const graphRef = useRef<any>();
  const [containerRef, { width, height }] = useMeasure();

  const graph = useMemo(() => {
    if (graphRef.current) {
      const refDom = ReactDOM.findDOMNode(graphRef.current);
      const g = createGraph(refDom);
      ref.current = g;
      return g;
    }
  }, [ref, graphRef.current]);

  useEffect(() => {
    if (graph) {
      graph.changeSize(width, height);
    }
  }, [graph, width, height]);

  useEffect(() => {
    if (graph) {
      graph.load(data);
    }
  }, [data, graph]);

  return (
    <div ref={containerRef as any} className="graph-container" style={{ width: "100%", height: "100%" }}>
      <div ref={graphRef} />
    </div>
  );
});

export default PackageGraph;
