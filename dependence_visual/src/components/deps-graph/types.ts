import { NodeConfig } from "@antv/g6/lib/types";

export type NodeType = "package" | "module" | "class" | "method";

export interface GraphNavigatorPath {
  title: string;
  data: GraphData;
}

export interface GraphNode extends NodeConfig {
  title: string;
  id: string;
  nodeType: NodeType;
  subNodes?: GraphNode[];
  parent?: GraphNode;
  size?: [number, number];
}

export interface GraphData {
  nodes: GraphNode[];
  edges: { id: string; target: string; source: string }[];
}
