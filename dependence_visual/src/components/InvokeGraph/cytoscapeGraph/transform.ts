export function transform(data: any) {
  if (!data) return;
  let nodes = data.nodes || [];
  let edges = data.edges || [];
  nodes = [...new Set(nodes)].map((item: any) => {
    return {
      data: {
        id: item.id,
        label: item.title,
        fullName: item.title,
        properties: item.properties,
        children: item.children
      },
    };
  });
  edges = edges.map((item: any) => ({
    data: {
      source: item.a,
      target: item.b,
      label: item.num || item.labels || "",
    },
  }));

  console.log(nodes);
  return {
    nodes,
    edges
  };
}
