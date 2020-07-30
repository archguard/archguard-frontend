export type Node = {
  id: string;
  title: string;
  properties: { [key: string]: string };
  isImplement?: boolean;
};
export type Edge = {
  a: string;
  b: string;
  labels?: string;
  num?: number;
};

export type GraphData = {
  nodes: Node[];
  edges: Edge[];
};

export interface TreeNode<T> {
  id: string;
  name: string;
  module: string;
  parents: TreeNode<T>[];
  children: TreeNode<T>[];
  isImplement?: boolean;
  target?: T;
}
