export interface TreeNode<T> {
  id: string;
  name: string;
  module?: string;
  fullName?: string;
  properties?: { [key: string]: string };
  parents: TreeNode<T>[];
  children: TreeNode<T>[];
  isImplement?: boolean;
  target?: T;
  visible?: boolean;
  hidden?: boolean;
}

export type Node<T> = TreeNode<T>;

export type Edge = {
  source: string;
  target: string;
  label?: string;
  hidden?: boolean;
};

export type GraphData<T> = {
  nodes: Node<T>[];
  edges: Edge[];
};

export type GraphTree<T> = {
  [key: string]: TreeNode<T>;
};
