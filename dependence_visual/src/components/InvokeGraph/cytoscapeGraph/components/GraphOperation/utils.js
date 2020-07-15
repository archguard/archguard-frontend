function dfs(node, graph, visited, stack, paths) {
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

function groupBy(list, key, setValue = (value) => value) {
  const result = {};
  for (const item of list) {
    if (!(item[key] in result)) {
      result[item[key]] = [setValue(item)];
    } else {
      result[item[key]].push(setValue(item));
    }
  }
  return result;
}

function findNodes(edges) {
  const nodes = {};
  for (const edge of edges) {
    nodes[edge.a] = false;
    nodes[edge.b] = false;
  }

  return nodes;
}

function transformEdges(edges, sourceKey, targetKey) {
  return edges.map((item) => {
    const edge = { ...item };
    edge[sourceKey] = item[sourceKey] + "";
    edge[targetKey] = item[targetKey] + "";
    return edge;
  });
}

export function findLoopPaths(edges, sourceKey = "a", targetKey = "b") {
  if (!edges) return [];
  const transformedEdges = transformEdges(edges, sourceKey, targetKey);
  const graph = groupBy(
    transformedEdges,
    sourceKey,
    (value) => value[targetKey]
  );
  const visited = findNodes(transformedEdges);
  const stack = [];
  const paths = [];

  for (const node in visited) {
    if (!visited[node]) {
      dfs(node, graph, visited, stack, paths);
    }
  }

  return paths;
}
