import lodash from "lodash";

export function filterDataWithConfig(data, configs) {
  if (!data || !data.nodes || !configs) return data;
  let nodes = lodash.cloneDeep(data.nodes);
  let edges = lodash.cloneDeep(data.edges);

  const edgesFrom = lodash.groupBy(edges, item => item.a);
  const edgesTo = lodash.groupBy(edges, item => item.b);

  const analysisScopeConfigs = configs.analysisScope || [];
  for (let config of analysisScopeConfigs) {
    for (let node of nodes) {
      if (node.title.indexOf(config.value) < 0) {
        hiddenNode(node, nodes, edgesFrom, edgesTo);
      }
    }
  }

  const nodeHiddenConfigs = configs.nodeHidden || [];
  for (let config of nodeHiddenConfigs) {
    for (let node of nodes) {
      if (
        (config.key === "module" && node.title === config.value) ||
        (config.key === "clz" && node.title.indexOf(config.value) >= 0)
      ) {
        hiddenNode(node, nodes, edgesFrom, edgesTo);
      }
    }
  }

  nodes = nodes.filter(item => !item.hidden);
  edges = edges.filter(item => !item.hidden);

  const nodeColorConfigs = configs.nodeColor
    ? configs.nodeColor.sort((a, b) => a.order - b.order)
    : [];
  for (let config of nodeColorConfigs) {
    for (let node of nodes) {
      if (node.title.indexOf(config.key) >= 0) {
        node.properties.color = config.value;
        break;
      }
    }
  }

  return { nodes, edges };
}

function hiddenNode(node, nodes, edgesFrom, edgesTo) {
  if (node.hidden) return;
  node.hidden = true;
  edgesTo[node.id] && edgesTo[node.id].forEach(edge => (edge.hidden = true));
  edgesFrom[node.id] &&
    edgesFrom[node.id].forEach(edge => {
      edge.hidden = true;
      if (edgesTo[edge.b].findIndex(item => !item.hidden) < 0) {
        for (let item of nodes) {
          if (item.id === edge.b) {
            hiddenNode(item, nodes, edgesFrom, edgesTo);
            break;
          }
        }
      }
    });

  // for (let edge of edges) {
  //   if (edge.b === node.id) {
  //     edge.hidden = true;
  //   } else if (edge.a === node.id) {
  //     edge.hidden = true;
  //     for (let item of nodes) {
  //       if (item.id === edge.b) {
  //         hiddenNode(item, edges, nodes);
  //       }
  //     }
  //   }
  // }
}
