import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from "cytoscape";
import dagre from 'cytoscape-dagre';

import { applyCubicBezierStyles } from "@/pages/servicesMap/graph/bazierStyle";
import { iconForNode } from "@/pages/servicesMap/graph/servicesMapIcon";

export interface CytoscapeProps {
  children?: ReactNode;
  elements: Cytoscape.ElementDefinition[] | any;
  height: number;
  serviceName?: string;
  style?: CSSProperties;
}

Cytoscape.use(dagre);

function getWidth(node: cytoscape.NodeSingular) {
  let ratio = 4;
  const value = node.data('value') / ratio;
  if (value > 1 && value < 20) {
    return value;
  } else if (value <= 1) {
    return 1;
  } else {
    return 20;
  }
}

export default function ServicesMapComponent(props: CytoscapeProps) {
  const cyRef = useRef<Cytoscape.Core>();
  // const [cy, setCy] = useState<Cytoscape.Core | undefined>(undefined);
  const [elements, setElements] = useState(props.elements);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }

    cy.on('layoutstop', (event) => {
      applyCubicBezierStyles(event.cy.edges());
    });
    cy.nodes().on("expandcollapse.beforeexpand", () => {
      cy.nodes().position().x += 100;
    });
  }, []);

  const cytoscapeStylesheet: Array<Cytoscape.Stylesheet> = [
    {
      selector: "node",
      style: {
        "background-color": "#1976d2",
        'background-image': (el: cytoscape.NodeSingular) => iconForNode(el),
        "padding-top": "4",
        "padding-bottom": "4",
        "padding-left": "4",
        "padding-right": "4",

        'text-background-color': "black",
        "text-margin-y": 30,
        'text-max-width': '200px',
        'text-background-shape': 'roundrectangle',
        shape: "ellipse",
      },
    },
    {
      selector: "node[label]",
      style: {
        label: "data(label)",
        "font-size": "12",
        color: "black",
        "text-halign": "center",
        "text-valign": "center",
      },
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'unbundled-bezier',
        'line-color': 'black',
        'overlay-opacity': 0,
        'target-arrow-color': 'black',
        'target-arrow-shape': 'triangle',
        width: getWidth
      },
    },
    {
      selector: 'edge[bidirectional]',
      style: {
        'source-arrow-shape': 'triangle',
        'source-arrow-color': 'black',
        'target-arrow-shape': 'triangle',
        // @ts-expect-error
        'source-distance-from-node': 20,
        'target-distance-from-node': 20,
      },
    },
  ];

  const layout = {
    name: "breadthfirst",
    nodeDimensionsIncludeLabels: true,
    fit: true,
  };

  return (<div>
    <CytoscapeComponent
      cy={(cy): void => {
        cyRef.current = cy;
      }}
      layout={ layout }
      elements={ elements }
      style={ props.style }
      stylesheet={ cytoscapeStylesheet }

    />
  </div>)
}
