import { NodeConfig } from "@antv/g6/lib/types";

export type DepsNodeSize = [number, number];

export enum DepsNodeType {
  PACKAGE = "package",
  MODULE = "module",
  CLASS = "class",
  METHOD = "method",
}

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
  size?: DepsNodeSize;
}

export interface DepsGraphData {
  nodes: DepsGraphNode[];
  edges: { id: string; target: string; source: string }[];
}
