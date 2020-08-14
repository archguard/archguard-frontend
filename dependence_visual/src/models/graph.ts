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

export type GNode = {
  id: string;
  name: string;

  children?: GNode[]; //布局后生成，或TreeGraph本身也需要children
  width?: number; //布局后会生成width,height
  height?: number;

  //下面三个属性用于内部计算
  _parents?: GNode[];
  _children?: GNode[]; //g6的节点在计算后内部可能会多一个children,这里用_children记录原如数据
  originProps?: any; //记录model本身的属性
};

export type GEdge = {
  id?: string;
  source: string;
  target: string;
};

export type G6GraphData = {
  nodes: GNode[];
  edges: GEdge[];
};
