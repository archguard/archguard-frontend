import { lightenDarkenColor } from "@/utils/transformColor.ts";

const defaultNodeColor = "#808080";
const defaultEdgeColor = "#cccccc";

const highlightNodeColor = "#2f4554";
const highlightEdgeColor = "#61a0a8";

const focusColor = "#c23531";

const hiddenColor = "#E8E8E8";

function getNodeStyle(color: string, z = "auto") {
  return {
    "background-color": color,
    color: color,
    "z-compound-depth": z,
  };
}

function getEdgeStyle(color: string, z = "auto") {
  return {
    "line-color": color,
    color: lightenDarkenColor(color, -50),
    "target-arrow-color": color,
    "target-arrow-shape": "triangle",
    "curve-style": "bezier",
    "z-compound-depth": z,
  };
}

export const defaultNodeStyle = {
  ...getNodeStyle(defaultNodeColor),
  padding: 0,
};
export const defaultEdgeStyle = getEdgeStyle(defaultEdgeColor);
export const hiddenNodeStyle = getNodeStyle(hiddenColor);
export const hiddenEdgeStyle = getEdgeStyle(hiddenColor);
export const highlightBrachNodeStyle = getNodeStyle(highlightNodeColor, "top");
export const highlightBrachEdgeStyle = getEdgeStyle(highlightEdgeColor, "top");
export const focusNodeStyle = getNodeStyle(focusColor, "top");
export const focusEdgeStyle = getEdgeStyle(focusColor, "top");
export const layoutOptions = [
  "elk",
  "breadthfirst",
  "random",
  "grid",
  "circle",
  "concentric",
  "cose",
];
