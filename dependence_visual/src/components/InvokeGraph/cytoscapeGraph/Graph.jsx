import React, { useState, useEffect } from "react";
import { message } from "antd";
import GraphOperation from "./components/GraphOperation";
import { initCytoscape, drawByData, showHighlightBrachNode } from "./drawGraph";
import { transform } from "./transform";
import { filterDataWithConfig } from "../utils";
import { scrollToAnchor } from "@/utils/anchor";
import FullscreenContainer from "../../FullscreenContainer";

export default function Graph(props) {
  const { id, data, title, configs, measurements, selectedNode, nodeLabel } = props;

  const [cy, setCy] = useState();
  const [graphLayout, setGraphLayout] = useState({
    name: "elk",
    nodeDimensionsIncludeLabels: true,
    fit: true,
  });

  const onEvent = { cxttap: () => message.success("复制成功") };
  useEffect(() => {
    console.log("init cy");
    setCy(initCytoscape(id, onEvent));
  }, []);

  useEffect(() => {
    drawByData(cy, transform(filterDataWithConfig(data, configs)), graphLayout, title);
  }, [data, title, configs]);

  useEffect(() => {
    if (!selectedNode) return;
    const data = selectedNode.data;
    const key = selectedNode.key || "id";
    if (!data) return;
    const selectedElement = cy.filter((e) => e.data(key) == data)[0];
    if (!selectedElement) return;
    showHighlightBrachNode(cy, selectedElement);
    scrollToAnchor(id);
  }, [selectedNode]);

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
