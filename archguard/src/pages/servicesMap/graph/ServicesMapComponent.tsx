import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import Cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

import { applyCubicBezierStyles } from "@/pages/servicesMap/graph/bazierStyle";
import { iconForNode } from "@/pages/servicesMap/graph/servicesMapIcon";
import cytoscape from "cytoscape";

export interface CytoscapeProps {
  children?: ReactNode;
  elements: cytoscape.ElementDefinition[];
  height: number;
  serviceName?: string;
  style?: CSSProperties;
}

Cytoscape.use(dagre);

function getWidth(node: cytoscape.NodeSingular) {
  let ratio = 4;
  const value = node.data("value") / ratio;

  if (value <= 1) {
    return 1;
  } else if (value > 1 && value < 20) {
    return value;
  } else {
    return 20;
  }
}

export default function ServicesMapComponent(props: CytoscapeProps) {
  const cyRef = useRef<cytoscape>();
  const [elements] = useState(props.elements);

  useEffect(() => {
    const cy: cytoscape = cyRef.current as cytoscape;
    if (!cy) {
      return;
    }

    cy.on("layoutstop", (event) => {
      applyCubicBezierStyles(event.cy.edges());
    });
    cy.nodes().on("expandcollapse.beforeexpand", () => {
      cy.nodes().position().x += 100;
    });
  }, [cyRef]);

  const cytoscapeStylesheet: Array<Cytoscape.Stylesheet> = [
    {
      selector: "node",
      style: {
        "background-color": "#1976d2",
        "background-image": (el: cytoscape.NodeSingular) => iconForNode(el),
        "padding-top": "4",
        "padding-bottom": "4",
        "padding-left": "4",
        "padding-right": "4",

        "text-background-color": "black",
        "text-margin-y": 30,
        "text-max-width": "200px",
        "text-background-shape": "roundrectangle",
        shape: "ellipse",
      },
    },
    {
      selector: "node[label]",
      style: {
        label: "data(label)",
        "font-size": "12",
        color: "#686868",
        "text-halign": "center",
        "text-valign": "center",
      },
    },
    {
      selector: "edge",
      style: {
        "curve-style": "unbundled-bezier",
        "line-color": "#686868",
        "overlay-opacity": 0,
        "target-arrow-color": "#686868",
        "target-arrow-shape": "triangle",
        width: getWidth,
      },
    },
    {
      selector: "edge[bidirectional]",
      style: {
        "source-arrow-shape": "triangle",
        "source-arrow-color": "#686868",
        "target-arrow-shape": "triangle",
        // @ts-expect-error
        "source-distance-from-node": 20,
        "target-distance-from-node": 20,
      },
    },
  ] as any;

  const layout = {
    name: "breadthfirst",
    nodeDimensionsIncludeLabels: true,
    fit: true,
  };

  return (
    <div>
      <CytoscapeComponent
        cy={(cy): void => {
          cyRef.current = cy;
        }}
        layout={layout}
        elements={elements}
        style={props.style}
        stylesheet={cytoscapeStylesheet}
      />
    </div>
  );
}
