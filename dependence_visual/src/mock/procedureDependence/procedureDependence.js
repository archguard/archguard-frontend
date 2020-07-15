const nodes = Array.from(new Array(10), (item, index) => ({
  id: index,
  title: "node" + index,
  properties: {}
}));

const callersEdges = [
  { a: 0, b: 1, labels: [] },
  { a: 0, b: 2, labels: [] },
  { a: 2, b: 3, labels: [] },
  { a: 3, b: 4, labels: [] },
  { a: 3, b: 5, labels: [] },
  { a: 3, b: 6, labels: [] },
  { a: 5, b: 7, labels: [] },
  { a: 5, b: 8, labels: [] },
  { a: 8, b: 9, labels: [] }
];

const calleesEdges = callersEdges.map(item => {
  const edge = { a: item.b, b: item.a, labels: [] };
  return edge;
});

export default function queryProcedureDependence(opt) {
  const list = opt.url.split("/");
  const dependenceType = list[list.length - 1];
  const procedureName = list[list.length - 3] + "." + list[list.length - 2];
  const node = {
    id: 0,
    title: procedureName,
    properties: {}
  };
  nodes[0] = node;

  const response = {
    nodes,
    edges: dependenceType === "callers" ? callersEdges : calleesEdges
  };
  
  return response;
}
