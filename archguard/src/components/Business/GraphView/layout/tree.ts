import { reduce, forEach, map } from "lodash";
import { EdgeConfig, NodeConfig } from "@antv/g6/es/types";
import Layout from "@antv/g6/es/layout/layout";
import Hierarchy from "@antv/hierarchy";
import { GNode, GEdge } from "@/models/graph";

type Node = NodeConfig & GNode;
type Edge = EdgeConfig & GEdge;

type NodeMap = { [key: string]: Node };

type LayoutOptions = {
  type: string;
  direction: string;
  getId?: (node: Node) => number | string;
  getWidth?: (node: Node) => number;
  getHeight?: (node: Node) => number;
  getVGap?: (node: Node) => number;
  getHGap?: (node: Node) => number;
};

type LayoutNode = {
  id: string;
  x: number;
  y: number;
  children: LayoutNode[];
  depth: number;
};

export const buildTree = (nodes: Node[], edges: Edge[], nodeMap: NodeMap) => {
  const rootNodeIds: { [key: string]: boolean } = {};
  const targetNodeIds: { [key: string]: string } = {};

  forEach(edges, (edge) => {
    const source = edge.source!;
    const target = edge.target!;

    const sourceNode = nodeMap[source];
    const targetNode = nodeMap[target];
    if (!sourceNode._children || !sourceNode.children) {
      sourceNode._children = [];
      sourceNode.children = [];
    }
    if (!targetNode._parents) {
      targetNode._parents = [];
    }

    if (targetNode._parents.length === 0) {
      sourceNode.children.push(targetNode as any);
    }

    sourceNode._children.push(targetNode);
    targetNode._parents.push(sourceNode);

    targetNodeIds[target] = target;
    if (targetNodeIds[source]) {
      delete rootNodeIds[source];
    } else if (!rootNodeIds[source]) {
      rootNodeIds[source] = true;
    }
  });
  return {
    id: "layout_tree_root",
    size: [0, 0],
    children: map(rootNodeIds, (value, id) => nodeMap[id]),
  };
};

export const getLayout = (options: LayoutOptions) => {
  const getSize = (
    size: number | number[] | undefined,
    index: number,
    defaultVaue = 16,
  ): number => {
    if (!size) {
      return defaultVaue;
    }
    if (typeof size === "number") {
      return size;
    } else {
      return size[index];
    }
  };
  const layout: LayoutOptions = {
    type: "compactBox",
    direction: options.direction || "LR",
    getId(d: Node) {
      return d.id;
    },
    getWidth(d: Node) {
      return getSize(d.size, 0, 16);
    },
    getHeight(d: Node) {
      return getSize(d.size, 1, 16);
    },
    getVGap() {
      return 10;
    },
    getHGap() {
      return 100;
    },
  };

  if (options.getId) {
    layout.getId = options.getId;
  }

  if (options.getHeight) {
    layout.getHeight = options.getHeight;
  }

  if (options.getWidth) {
    layout.getWidth = options.getWidth;
  }

  if (options.getVGap) {
    layout.getVGap = options.getVGap;
  }

  if (options.getHGap) {
    layout.getHGap = options.getHGap;
  }

  return (data: any) => Hierarchy[layout.type](data, layout);
};

const getNodeMap = (nodes: Node[]) => {
  return reduce(
    nodes,
    (accumulator: { [key: string]: Node }, item) => {
      delete item.parents;
      delete item.children;
      accumulator[item.id] = item;
      return accumulator;
    },
    {},
  );
};

const dfs = (layoutNode: LayoutNode, nodeMap: NodeMap) => {
  const { id, x, y, children, depth } = layoutNode;
  const treeNode = nodeMap[id];
  treeNode.x = x;
  treeNode.y = y;
  treeNode.depth = depth;

  forEach(children, (item) => {
    dfs(item, nodeMap);
  });
};
/***
 * 用法：拿到数据后直接调方法将计算x, y及depth，对于g6.Graph初始化时不用指定layout
 * positionNodes(data.nodes, data.edges, {
    getHGap() {
      return 200;
    },
    getVGap() {
      return 30;
    },
  });
  g6Graph.data({nodes, edges})
 *
 */

export const positionNodes = (nodes: Node[], edges: Edge[], options: LayoutOptions) => {
  const layoutMethod = getLayout(options);
  const nodeMap = getNodeMap(nodes);
  const rootNode = buildTree(nodes, edges, nodeMap);
  const layoutNode = layoutMethod(rootNode);
  forEach(layoutNode.children, (node) => {
    dfs(node, nodeMap);
  });
};

/***
 * 用法：初始化g6.Graph时指定layout.type为treeLayout
 * layout: {
    type: "treeLayout",
    direction: "LR",
    getId(d) {
      return d.id;
    },
    getHeight(d) {
      return d && d.size ? d.size[1] : 16;
    },
    getWidth(d) {
      return d && d.size ? d.size[0] : 16;
    },
    getVGap() {
      return 10;
    },
    getHGap() {
      return 100;
    },
  },

  同层级节点之间的连线需要特殊处理：
  比级edge两节点的层级，如果一样就设置为曲线，并设置曲线偏移
  graph.edge((edge: any) => {
    const { source, target } = edge;
    const sourceNode = graph.findById(source);
    const targetNode = graph.findById(target);
    const sourceModel = sourceNode.getModel();
    const targetModel = targetNode.getModel();
    const edgeCfg = {
      id: edge.id || `${source}-${target}`,
      type: "line",
    };
    if (sourceModel.depth === targetModel.depth) {
      edgeCfg.type = "quadratic";
      edgeCfg.curveOffset = 100;
    }
    return edgeCfg;
  });
 */
Layout.registerLayout("treeLayout", {
  rootNodes: [],
  nodeMap: {},
  execute() {
    const { nodes, edges } = this;
    positionNodes(nodes, edges, this);
  },
} as any);
