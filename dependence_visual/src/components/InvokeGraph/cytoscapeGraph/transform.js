export function transform(data) {
  if (!data) return;
  let nodes = data.nodes || [];
  let edges = data.edges || [];
  nodes = [...new Set(nodes)].map((item) => {
    return {
      data: {
        id: item.id,
        label: item.title,
        fullName: item.title,
        properties: item.properties,
      },
    };
  });
  edges = edges.map((item) => ({
    data: {
      source: item.a,
      target: item.b,
      label: item.num || item.labels || "",
    },
  }));

  console.log(nodes);
  return { nodes, edges };
}
