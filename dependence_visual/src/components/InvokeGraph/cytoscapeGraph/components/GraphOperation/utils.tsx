import { find, findIndex, forEach, remove, reduce } from "lodash";
type Node = {
  id: string;
  title: string;
  fullName: string;
  properties: { module: string };
  children?: Node[];
  parents?: Node[];
  visible?: boolean;
};
type Edge = {
  a: string;
  b: string;
  label?: string[];
};

function dfs(
  node: string,
  graph: { [x: string]: any },
  visited: { [x: string]: any },
  stack: string[],
  paths: string[][],
) {
  visited[node] = true;
  stack.push(node);
  if (node in graph) {
    for (const n of graph[node]) {
      if (!(stack.indexOf(n) >= 0)) {
        if (!visited[n]) {
          dfs(n, graph, visited, stack, paths);
        }
      } else {
        const index = stack.indexOf(n);
        const path = stack.slice(index);
        paths.push(path);
      }
    }
  }
  stack.pop();
}

function groupBy(list: any, key: string, setValue = (value: string) => value) {
  const result: { [key: string]: string[] } = {};
  for (const item of list) {
    if (!(item[key] in result)) {
      result[item[key]] = [setValue(item)];
    } else {
      result[item[key]].push(setValue(item));
    }
  }
  return result;
}

function findNodes(edges: Array<{ a: string; b: string }>) {
  const nodes: { [key: string]: boolean } = {};
  for (const edge of edges) {
    nodes[edge.a] = false;
    nodes[edge.b] = false;
  }

  return nodes;
}

function transformEdges(
  edges: Array<{ [key: string]: string }>,
  sourceKey: string,
  targetKey: string,
) {
  return edges.map((item) => {
    const edge = { ...item };
    edge[sourceKey] = item[sourceKey] + "";
    edge[targetKey] = item[targetKey] + "";
    return edge;
  });
}

export function findLoopPaths(
  edges: Array<{ [key: string]: string }>,
  sourceKey = "a",
  targetKey = "b",
) {
  if (!edges) return [];
  const transformedEdges = transformEdges(edges, sourceKey, targetKey);
  const graph = groupBy(transformedEdges, sourceKey, (value: any) => value[targetKey]);
  const visited = findNodes(transformedEdges as Array<{ a: string; b: string }>);
  const stack: string[] = [];
  const paths: string[][] = [];

  for (const node in visited) {
    if (!visited[node]) {
      dfs(node, graph, visited, stack, paths);
    }
  }

  return paths;
}

export function buildDependenceTree(
  { nodes = [], edges = [] }: { nodes: Node[]; edges: Edge[] } = { nodes: [], edges: [] },
) {
  const visitNodeMap: { [key: string]: boolean } = {};
  const tree: { [key: string]: any } = {};
  const nodeMap = reduce(
    nodes,
    (accumulator: { [key: string]: Node }, node) => {
      accumulator[node.id] = node;
      return accumulator;
    },
    {},
  );
  const getNodeById = (nodeId: string): Node => {
    const node = nodeMap[nodeId];
    if (!node.children) {
      node.children = [];
    }
    return node;
  };
  forEach(edges, (edge) => {
    const { a: startNodeId, b: endNodeId } = edge;
    const startNode = getNodeById(startNodeId);
    const endNode = getNodeById(endNodeId);
    const startNodeNotInTree: boolean = !visitNodeMap[startNodeId];
    const endNodeInTree: boolean = !!tree[endNodeId];

    if (startNodeNotInTree) {
      //开始节点在树中还不存在
      tree[startNodeId] = startNode;
    }
    startNode.children!.push(endNode);

    if (!endNode.parents) {
      endNode.parents = [];
    }
    endNode.parents.push(startNode);

    /**
     * {a: 1, b: 2} => { 1: [2] }
     * {a: 3, b: 1} => { 3: [{1: [2]}]}
     * 需要删除被引用的顶级节点
     */
    if (endNodeInTree) {
      delete tree[endNodeId];
    }
    visitNodeMap[startNodeId] = true;
    visitNodeMap[endNodeId] = true;
  });
  return tree;
}

export function getVisibleTreeNodeByDeep(
  tree: { [key: string]: Node },
  deep: number,
): { nodes: Node[]; edges: Edge[] } {
  const visibleNodes: Node[] = [];
  const visibleEdges: Edge[] = [];

  const travelNode = (node: Node, nodeDeep: number, path: string[]) => {
    const nextDeep = nodeDeep + 1;
    node.visible = true;
    path.push(node.id);
    if (visibleNodes.indexOf(node) === -1) {
      visibleNodes.push(node);
    }

    const { children } = node;
    forEach(children, (childNode) => {
      const isNotLoop = path.indexOf(childNode.id) === -1;
      if (isNotLoop) {
        visibleEdges.push({ a: node.id, b: childNode.id });
        if (nextDeep <= deep) {
          travelNode(childNode, nextDeep, path);
        }
      }
    });
    path.pop();
  };

  forEach(tree, (node) => {
    travelNode(node, 1, []);
  });

  return {
    nodes: visibleNodes,
    edges: visibleEdges,
  };
}

export function expandNode(
  node: Node,
  { nodes, edges }: { nodes: Node[]; edges: Edge[] },
): { nodes: Node[]; edges: Edge[] } {
  const newNodes = nodes.slice();
  const newEdges = edges.slice();
  const { id, children } = node;
  forEach(children, (item) => {
    item.visible = true;
    newNodes.push(item);
    newEdges.push({ a: id, b: item.id });
  });
  return {
    nodes: newNodes,
    edges: newEdges,
  };
}

export function collpaseNode(
  node: Node,
  { nodes, edges }: { nodes: Node[]; edges: Edge[] },
): { nodes: Node[]; edges: Edge[] } {
  const newNodes = nodes.slice();
  const newEdges = edges.slice();
  const { id } = node;

  const length = newEdges.length;
  for (let index = length; index < length; index--) {
    const { a: source, b: target } = newEdges[index];
    if (source === id) {
      newEdges.splice(index, 1);

      const targetNodeIndex = findIndex(newNodes, (item) => item.id === target);
      const targetNode = newNodes[targetNodeIndex];
      targetNode.visible = false;
      newNodes.splice(targetNodeIndex, 1);
    }
  }
  return {
    nodes: newNodes,
    edges: newEdges,
  };
}
