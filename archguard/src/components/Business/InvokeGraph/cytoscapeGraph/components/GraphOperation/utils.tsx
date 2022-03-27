import { forEach, remove, some } from "lodash";
import { TreeNode, Edge, GraphData } from "@/models/graph";
import { SourceCodeItem } from "@/models/java";

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

function findNodes(edges: Edge[]) {
  const nodes: { [key: string]: boolean } = {};
  for (const edge of edges) {
    nodes[edge.source] = false;
    nodes[edge.target] = false;
  }

  return nodes;
}

export function findLoopPaths(edges: Edge[], sourceKey = "source", targetKey = "target") {
  if (!edges) return [];
  const graph = groupBy(edges, sourceKey, (value: any) => value[targetKey]);
  const visited = findNodes(edges);
  const stack: string[] = [];
  const paths: string[][] = [];

  for (const node in visited) {
    if (!visited[node]) {
      dfs(node, graph, visited, stack, paths);
    }
  }

  return paths;
}

export function expandNode(
  node: TreeNode<SourceCodeItem>,
  { nodes, edges }: GraphData<SourceCodeItem>,
): GraphData<SourceCodeItem> {
  const newNodes = nodes.slice();
  const newEdges = edges.slice();
  const { id, children } = node;
  forEach(children, (item) => {
    item.visible = true;
    newNodes.push(item);
    newEdges.push({ source: id, target: item.id });
  });
  return {
    nodes: newNodes,
    edges: newEdges,
  };
}

export function collapseNode(
  node: TreeNode<SourceCodeItem>,
  { nodes, edges }: GraphData<SourceCodeItem>,
): GraphData<SourceCodeItem> {
  const newNodes = nodes.slice();
  const newEdges = edges.slice();

  const hideChildNode = (parentId: string, node: TreeNode<SourceCodeItem>) => {
    const { id, parents, children } = node;
    const hasParentVisble = some(parents, (parent) => {
      return parent.id !== parentId && parent.visible;
    });
    if (!hasParentVisble) {
      node.visible = false;
      remove(newNodes, (item) => item.id === id);
      forEach(children, (child) => {
        if (child.visible && newNodes.indexOf(child) !== -1) {
          hideChildNode(id, child);
        }
      });
    }
    remove(newEdges, (edge) => edge.source === parentId && edge.target === id);
  };

  forEach(node.children, (child) => {
    hideChildNode(node.id, child);
  });

  return {
    nodes: newNodes,
    edges: newEdges,
  };
}

export function isExpand(node: TreeNode<SourceCodeItem>, edges: Edge[]) {
  return some(edges, (edge) => edge.source === node.id);
}
