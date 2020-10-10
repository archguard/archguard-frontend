export function transform(data: any) {
  if (!data) return;
  let nodes = data.nodes || [];
  let edges = data.edges || [];
  nodes = [...new Set(nodes)].map((item: any) => {
    return {
      data: {
        id: item.id,
        label: item.name,
        fullName: item.name,
        properties: item.properties || {},
      },
    };
  });
  edges = edges.map((item: any) => ({
    data: {
      source: item.source,
      target: item.target,
      label: item.num || item.labels || "",
    },
  }));

  return {
    nodes,
    edges,
  };
}
