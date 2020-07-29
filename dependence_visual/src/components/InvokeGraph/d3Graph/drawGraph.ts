import * as d3 from "d3";
import * as dagreD3 from "dagre-d3";

export function drawGraph(id, data, title, rankdir, onNodeClick) {
  if (!data || !data.nodes || data.nodes.length === 0) {
    return;
  }

  const g = new dagreD3.graphlib.Graph({ compound: true })
    .setGraph({ rankdir: rankdir, edgesep: 10, ranksep: 60, nodesep: 10 }) // rankdir 方向
    .setDefaultEdgeLabel(function () {
      return {};
    });

  data.nodes.forEach(function (v) {
    g.setNode(v.id, {
      label: nodeLabel(v),
      style: nodeStyle(v, title),
      shape: nodeShape(v, title),
    });
  });
  data.edges.forEach(function (v) {
    g.setEdge(v.a, v.b, {
      label: edgeLabel(v),
      arrowhead: edgeArrowhead(v),
      arrowheadStyle: edgeArrowheadStyle(v),
    });
  });

  g.nodes().forEach(function (v) {
    var node = g.node(v);
    if (node === undefined) {
      console.log(v);
      console.log("node is " + node);
    } else {
      node.rx = node.ry = 5;
    }
  });

  const svg = d3.select("svg#" + id);
  svg.select("g").remove();
  const svgGroup = svg.append("g");

  setZoom(svgGroup, svg, g);
  setNodeClick(svg, g, onNodeClick);
}

function nodeLabel(n) {
  const properties = Object.assign({}, n.properties, {});
  delete properties.color;
  if (properties && !(Object.keys(properties).length === 0 && properties.constructor === Object)) {
    return JSON.stringify(properties) + "\n" + n.title;
  } else {
    return n.title;
  }
}

function nodeStyle(n, title) {
  // parents parent ??
  if (n.properties.length > 0 && (n.properties.parents || n.properties.parent)) {
    return "fill: #afa";
  }
  if (title === n.title) {
    return "fill: yellow";
  }
  if (n.properties.color) {
    return "fill: " + n.properties.color;
  }
}

function nodeShape(n, title) {
  // parents parent ??
  if (n.properties.length > 0 && (n.properties.parents || n.properties.parent)) {
    return "ellipse";
  }
  if (title === n.title) {
    return "diamond";
  } else {
    return "rect";
  }
}

function edgeLabel(v) {
  if (v.labels.length > 0) {
    return "(" + v.labels + ")";
  }
}

function edgeArrowhead(v) {
  if (v.labels.length > 0) {
    if (v.labels.indexOf("parent") !== -1) {
      return "normal";
    }
  }
  return "vee";
}

function edgeArrowheadStyle(v) {
  if (v.labels.length > 0) {
    if (v.labels.indexOf("parent") !== -1) {
      return "fill: #f66";
    }
  }
}

//  function edgeStyle(v) {
//     if (v.labels.length > 0) {
//       if (v.labels.indexOf("parent") !== -1) {
//         return "stroke: #f66;stroke-width: 3px;";
//       }
//     }
//   }

function setZoom(svgGroup, svg, g) {
  const zoom = d3.zoom().on("zoom", () => {
    svgGroup.attr("transform", d3.event.transform);
  });
  svg.call(zoom);

  const render = new dagreD3.render();

  render(svgGroup, g);
}

function setNodeClick(svg, g, onNodeClick) {
  if (onNodeClick) {
    svg.selectAll("g.node").on("click", function (id) {
      var _node = g.node(id);
      onNodeClick(_node);
    });
  }
}
