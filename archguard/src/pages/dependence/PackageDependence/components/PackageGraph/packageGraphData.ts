import { NodeConfig, EdgeConfig } from '@antv/g6/lib/types';

const COLORS = [
  "#4d64b5",
  "#63b7af",
  "#ecce6d",
  "#27496d",
  "#00a8cc",
  "#546b66",
  "#ee8572",
  "#e9f3b6",
  "#d98e37",
  "#c06c9f",
  "#bbdeb6",
  "#65587f",
];

export interface PackageGraphNode {
  id: string;
  children: PackageGraphNode[];
  label: string;
  parent: string;
  nodeMap: Map<any, any>;
  collapse: boolean;
  info?: any;
  color?: string;
  deep?: number;
  x?: number;
  y?: number;
  edgeCount?: number;
}

interface PackageGraphEdge {
  source: string;
  target: string;
  nodeMap: Map<any, any>;
  count: number;
  label: number;
  index: number;
  sourceAnchor: number;
  targetAnchor: number;
}

export default class PackageGraphData {
  nodeMap = new Map();
  nodeEdgeMap = new Map();
  nodes: PackageGraphNode[] = [];
  edges: PackageGraphEdge[] = [];
  rootNodes: PackageGraphNode[] = [];

  visibleNodes: PackageGraphNode[] = [];
  visibleNodeIds = new Map();
  visibleEdges: PackageGraphEdge[] = [];

  load(data: any, collapseDeep = 4) {
    this.nodeMap.clear();
    this.nodeEdgeMap.clear();
    this.nodes = [];
    this.edges = [];
    if (!data) return;

    // 转换节点结构
    data.nodes.forEach((node: any) => {
      const newNode: PackageGraphNode = {
        id: `${node.id}`,
        children: [],
        label: node.name,
        parent: `${node.parent}`,
        nodeMap: this.nodeMap,
        collapse: false,
      };
      this.nodeMap.set(`${node.id}`, newNode);
      this.nodes.push(newNode);
    });

    // 顶级节点
    this.rootNodes = this.nodes.filter((n) => n.parent === "0");

    // 转换边结构
    this.edges = data.edges.map((edge: any) => {
      const newEdge = {
        source: `${edge.a}`,
        target: `${edge.b}`,
        count: edge.num,
        nodeMap: this.nodeMap,
      };

      let sourceNodeEdges = this.nodeEdgeMap.get(newEdge.source);
      let targetNodeEdges = this.nodeEdgeMap.get(newEdge.target);

      if (!sourceNodeEdges) {
        sourceNodeEdges = [newEdge];
        this.nodeEdgeMap.set(newEdge.source, sourceNodeEdges);
      } else {
        sourceNodeEdges.push(newEdge);
      }

      if (!targetNodeEdges) {
        targetNodeEdges = [newEdge];
        this.nodeEdgeMap.set(newEdge.target, targetNodeEdges);
      } else {
        targetNodeEdges.push(newEdge);
      }

      return newEdge;
    });

    // 为根节点创建公共属性(分支颜色)
    this.rootNodes.forEach((node, index) => {
      node.collapse = true;
      node.info = {
        color: COLORS[index % COLORS.length],
      };
    });

    // 构造树层次
    this.nodes.forEach((node) => {
      const parent = this.nodeMap.get(node.parent);
      if (parent) {
        node.color = parent.color;
        parent.children.push(node);
      }
    });

    const deepInto = (parent: PackageGraphNode, node: PackageGraphNode, deep: number) => {
      node.deep = deep;
      node.collapse = deep >= collapseDeep;
      node.info = parent.info || node.info;
      node.children.forEach((child) => deepInto(node, child, deep + 1));
    };

    this.rootNodes.forEach((node) => deepInto(node, node, 0));
    this.nodes = this.nodes.sort((a, b) => (a.deep as number) - (b.deep as number));
  }

  layoutNodes() {
    let y = 0;
    const layoutInto = (node: PackageGraphNode) => {
      node.x = 0;
      node.y = y;

      const edgeCount = (node.edgeCount as number) || 0;
      const height = 30 + Math.max(0, edgeCount - 1) * 10;

      y += height + 2;

      if (!node.collapse) {
        if (node.children && node.children.length) {
          node.children.forEach((n) => layoutInto(n));
        }
      }
    };

    this.rootNodes.forEach((node) => layoutInto(node));
  }

  // 设置边样式和锚点
  layoutEdges() {
    const nodeAnchorIndex = new Map();
    let edgeIndex = 0;
    this.visibleEdges.forEach((edge) => {
      edge.label = edge.count;
      edge.index = edgeIndex;

      edge.sourceAnchor = nodeAnchorIndex.get(edge.source) || 0;
      edge.targetAnchor = nodeAnchorIndex.get(edge.target) || 0;
      nodeAnchorIndex.set(edge.source, edge.sourceAnchor as number + 1);
      nodeAnchorIndex.set(edge.target, edge.targetAnchor as number + 1);

      edgeIndex++;
    });
  }

  render(): { nodes: NodeConfig[], edges: EdgeConfig[] } {
    this.visibleNodeIds.clear();
    const nodes: PackageGraphNode[] = [];

    const visibleNodeWalk = (node: PackageGraphNode) => {
      nodes.push(node);
      node.edgeCount = 0;
      this.visibleNodeIds.set(node.id, true);
      if (!node.collapse) {
        node.children && node.children.forEach(visibleNodeWalk);
      }
    };

    this.rootNodes.forEach(visibleNodeWalk);

    const edges = this.edges.filter((edge) => {
      const sourceVisible = this.visibleNodeIds.get(edge.source);
      const targetVisible = this.visibleNodeIds.get(edge.target);
      const visilbe = sourceVisible && targetVisible;

      if (visilbe) {
        const sourceNode = this.nodeMap.get(edge.source);
        const targetNode = this.nodeMap.get(edge.target);
        sourceNode.edgeCount++;
        targetNode.edgeCount++;
      }

      return visilbe;
    });

    this.visibleEdges = edges;
    this.visibleNodes = nodes;

    this.layoutNodes();
    this.layoutEdges();
    return {
      nodes: (nodes as unknown) as NodeConfig[],
      edges: (edges as unknown) as EdgeConfig[]
    };
  }
}
