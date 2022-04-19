/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import cytoscape from 'cytoscape';
import { iconForNode } from "@/pages/servicesMap/graph2/services-map-icon";

export const getAnimationOptions = (): cytoscape.AnimationOptions => ({
  duration: 250,
  easing: "ease-in-quad",
});

export const getNodeHeight = (): number => 40;

export const getCytoscapeOptions = (): cytoscape.CytoscapeOptions => ({
  boxSelectionEnabled: false,
  maxZoom: 3,
  minZoom: 0.2,
  style: getStyle(),
});

export const SERVICE_NAME = 'service.name';

const zIndexNode = 200;
const zIndexEdge = 100;
const zIndexEdgeHighlight = 110;
const zIndexEdgeHover = 120;

const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

function isService(el: cytoscape.NodeSingular) {
  return el.data(SERVICE_NAME) !== undefined;
}

function getBorderWidth(el: cytoscape.NodeSingular) {
  return 4;
}

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

const getStyle = (): cytoscape.Stylesheet[] => {
  const lineColor = "#98a2b3";
  return [
    {
      selector: 'core',
      // @ts-expect-error DefinitelyTyped does not recognize 'active-bg-opacity'
      style: { 'active-bg-opacity': 0 },
    },
    {
      selector: 'node',
      style: {
        'background-color': "#ffffff",
        // The DefinitelyTyped definitions don't specify that a function can be
        // used here.
        'background-image': (el: cytoscape.NodeSingular) => iconForNode(el),
        'background-height': (el: cytoscape.NodeSingular) =>
          isService(el) ? '60%' : '40%',
        'background-width': (el: cytoscape.NodeSingular) =>
          isService(el) ? '60%' : '40%',
        'border-color': '#7de2d1',
        'border-style': 'solid',
        'border-width': getBorderWidth,
        color: (el: cytoscape.NodeSingular) =>
          el.hasClass('primary') || el.selected() ? "#7de2d1" : "#343741",
        // theme.euiFontFamily doesn't work here for some reason, so we're just
        // specifying a subset of the fonts for the label text.
        'font-family': 'Inter UI, Segoe UI, Helvetica, Arial, sans-serif',
        'font-size': "14px",
        ghost: 'yes',
        'ghost-offset-x': 0,
        'ghost-offset-y': 2,
        'ghost-opacity': 0.15,
        height: getNodeHeight(),
        label: (el: cytoscape.NodeSingular) =>
          isService(el)
            ? el.data(SERVICE_NAME)
            : el.data('label') || el.data('span.destination.service.resource'),
        'min-zoomed-font-size': 8,
        'overlay-opacity': 0,
        shape: (el: cytoscape.NodeSingular) => isService(el) ? 'ellipse' : 'diamond',
        'text-background-color': '#7de2d1',
        'text-background-opacity': (el: cytoscape.NodeSingular) => el.hasClass('primary') || el.selected() ? 0.1 : 0,
        'text-background-padding': '4px',
        'text-background-shape': 'roundrectangle',
        'text-margin-y': 8,
        'text-max-width': '200px',
        'text-valign': 'bottom',
        'text-wrap': 'ellipsis',
        width: '40px',
        'z-index': zIndexNode,
      },
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'unbundled-bezier',
        'line-color': lineColor,
        'overlay-opacity': 0,
        'target-arrow-color': lineColor,
        'target-arrow-shape': isIE11 ? 'none' : 'triangle',
        // The DefinitelyTyped definitions don't specify this property since it's
        // fairly new.
        //
        // @ts-expect-error
        'target-distance-from-node': isIE11 ? undefined : '4px',
        width: getWidth,
        'source-arrow-shape': 'none',
        'z-index': zIndexEdge,
      },
    },
    {
      selector: 'edge[bidirectional]',
      style: {
        'source-arrow-shape': isIE11 ? 'none' : 'triangle',
        'source-arrow-color': lineColor,
        'target-arrow-shape': isIE11 ? 'none' : 'triangle',
        // @ts-expect-error
        'source-distance-from-node': isIE11 ? undefined : 4,
        'target-distance-from-node': isIE11 ? undefined : 4,
      },
    },
    {
      selector: 'edge[isInverseEdge]',
      // @ts-expect-error DefinitelyTyped says visibility is "none" but it's
      // actually "hidden"
      style: { visibility: 'hidden' },
    },
    {
      selector: 'edge.nodeHover',
      style: {
        width: 4,
        'z-index': zIndexEdgeHover,
        'line-color': '#98a2b3',
        'source-arrow-color': '#98a2b3',
        'target-arrow-color': '#98a2b3',
      },
    },
    {
      selector: 'node.hover',
      style: {
        'border-width': getBorderWidth,
      },
    },
    {
      selector: 'edge.highlight',
      style: {
        width: 4,
        'line-color': '#7de2d1',
        'source-arrow-color': '#7de2d1',
        'target-arrow-color': '#7de2d1',
        'z-index': zIndexEdgeHighlight,
      },
    },
  ];
};
