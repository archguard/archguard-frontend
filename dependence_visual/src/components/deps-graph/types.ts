import { NodeConfig } from "@antv/g6/lib/types";

export type DepsNodeType = "package" | "module" | "class" | "method";

export interface GraphNavigatorPath {
  title: string;
  data: DepsGraphData;
}

export interface DepsGraphNode extends NodeConfig {
  title: string;
  id: string;
  nodeType: DepsNodeType;
  subNodes?: DepsGraphNode[];
  parent?: DepsGraphNode;
  size?: [number, number];
}

export interface DepsGraphData {
  nodes: DepsGraphNode[];
  edges: { id: string; target: string; source: string }[];
}
