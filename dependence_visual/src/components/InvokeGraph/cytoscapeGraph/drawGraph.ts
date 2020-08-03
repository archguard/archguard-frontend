import cytoscape, { Core, LayoutOptions, CollectionReturnValue, NodeCollection, NodeSingular, EdgeSingular } from "cytoscape";
import elk from "cytoscape-elk";
import copy from "copy-to-clipboard";
import {
  defaultNodeStyle,
  defaultEdgeStyle,
  hiddenNodeStyle,
  hiddenEdgeStyle,
  highlightBrachNodeStyle,
  highlightBrachEdgeStyle,
  focusNodeStyle,
  focusEdgeStyle,
} from "./config";
import { MessageType } from 'antd/lib/message';

cytoscape.use(elk);

export function initCytoscape(id = "cy", onEvent: { cxttap: () => MessageType }) {
  const cy = cytoscape({
    container: document.getElementById(id),
    style: [
      {
        selector: "node",
        style: {
          ...defaultNodeStyle,
          label: "data(label)",
        },
      },
      {
        selector: "edge",
        style: {
          ...defaultEdgeStyle,
          label: "data(label)",
        },
      },
    ],
  });

  // cy.on("tap", "node", function (event) {
  //   showHighlightBrachNode(cy, event.target);
  // });

  cy.on("tap", "edge", function (event) {
    showHighlightBrachEdge(cy, event.target);
  });

  cy.on("cxttap", "node", function (event) {
    const node = event.target;
    copy(node.data("fullName"));
    onEvent.cxttap();
  });

  return cy;
}

export function drawByData(cy: Core | undefined, data: any | undefined, layout: LayoutOptions, title: string) {
  if (!cy || !data) return;
  cy.remove(cy.elements());
  cy.add(data);

  title && showDifferentMainNode(cy, title);
  showDifferentParent(cy);
  showNodeColorByConfig(cy.nodes());
  drawByLayout(cy, layout);
}

export function drawByLayout(
  cy: Core,
  layout = {
    name: "elk",
  },
) {
  cy.layout(layout).run();
}

export function resetDefaultStyle(cy: Core) {
  setStyle(cy.elements(), defaultNodeStyle, defaultEdgeStyle);
  showNodeColorByConfig(cy.nodes());
}

function setStyle(elements: CollectionReturnValue, nodeStyle: object, edgeStyle: object) {
  elements.nodes().style(nodeStyle);
  elements.edges().style(edgeStyle);
}

function setHiddenStyle(cy: Core) {
  setStyle(cy.elements(), hiddenNodeStyle, hiddenEdgeStyle);
}

function showDifferentMainNode(cy: Core, title: string) {
  cy.nodes().forEach((e) => {
    if (e.data().fullName === title) {
      e.style({
        shape: "star",
      });
    }
  });
}

function showDifferentParent(cy: Core) {
  cy.edges().forEach((e) => {
    if (e.data().label.indexOf("parent") >= 0) {
      e.style({
        "target-arrow-fill": "hollow",
      });
    }
  });
}

export function showLoop(cy: Core, path: string[]) {
  path.push(path[0]);
  const elements = cy.elements();
  setStyle(elements, hiddenNodeStyle, hiddenEdgeStyle);
  cy.edges().forEach((e) => {
    for (let i = 1; i < path.length; i++) {
      if (e.source().id() === path[i - 1] && e.target().id() === path[i]) {
        e.style(focusEdgeStyle);
        e.source().style(focusNodeStyle);
        e.target().style(focusNodeStyle);
      }
    }
  });
}

function showNodeColorByConfig(nodes: NodeCollection) {
  nodes.forEach((e) => {
    const color = e.data("properties").color;
    if (color) {
      e.style({
        "background-color": color,
        color,
      });
    }
  });
}

export function showHighlightBrachNode(cy: Core, node: NodeSingular) {
  setHiddenStyle(cy);
  if (!node) return;
  setStyle(node.successors(), highlightBrachNodeStyle, highlightBrachEdgeStyle);
  setStyle(node.predecessors(), highlightBrachNodeStyle, highlightBrachEdgeStyle);
  node.style(focusNodeStyle);
}

function showHighlightBrachEdge(cy: Core, edge: EdgeSingular) {
  setHiddenStyle(cy);
  if (!edge) return;
  edge.target().style(highlightBrachNodeStyle);
  setStyle(edge.target().successors(), highlightBrachNodeStyle, highlightBrachEdgeStyle);
  edge.source().style(highlightBrachNodeStyle);
  setStyle(edge.source().predecessors(), highlightBrachNodeStyle, highlightBrachEdgeStyle);
  edge.style(focusEdgeStyle);
}

export function resetNodeSize(cy: Core, nodesSize: any, key = "id") {
  cy.nodes().forEach((e) => {
    e.style({
      padding: nodesSize[e.data(key)],
    });
  });
}

export function resetNodeLabel(cy: Core, setLabel: Function) {
  cy.nodes().forEach((e) => {
    e.data("label", setLabel(e.data("fullName")));
  });
}
