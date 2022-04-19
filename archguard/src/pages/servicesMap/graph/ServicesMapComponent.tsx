import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from "cytoscape";
import dagre from 'cytoscape-dagre';

import { applyCubicBezierStyles } from "@/pages/servicesMap/graph/bazierStyle";

export interface CytoscapeProps {
  children?: ReactNode;
  elements: Cytoscape.ElementDefinition[] | any;
  height: number;
  serviceName?: string;
  style?: CSSProperties;
}

Cytoscape.use(dagre);

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
        width: "label",
        height: "label",
        // a single "padding" is not supported in the types :(
        "padding-top": "4",
        "padding-bottom": "4",
        "padding-left": "4",
        "padding-right": "4",
        // this fixes the text being shifted down on nodes (sadly no fix for edges, but it's not as obvious there without borders)
        "text-margin-y": -3,
        shape: "round-rectangle",
      },
    },
    {
      selector: "node[label]",
      style: {
        label: "data(label)",
        "font-size": "12",
        color: "white",
        "text-halign": "center",
        "text-valign": "center",
      },
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        "target-arrow-shape": "triangle",
        width: 1.5,
      },
    },
    {
      selector: "edge[label]",
      style: {
        label: "data(label)",
        "font-size": "12",
        "text-background-color": "white",
        "text-background-opacity": 1,
        "text-background-padding": "2px",
        "text-margin-y": -4,
        // so the transition is selected when its label/name is selected
        "text-events": "yes",
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
