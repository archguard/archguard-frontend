import G6 from "@antv/g6";
import PackageGraphData from "./packageGraphData";

export function getFullPackageName(node) {
  const nodeMap = node.nodeMap;
  let name = `${node.label}`;
  while (true) {
    const parentNode = nodeMap.get(node.parent);
    if (!parentNode) break;
    name = `${parentNode.label}.${name}`;
    node = parentNode;
  }
  return name;
}

export function createGraph(container) {
  const data = new PackageGraphData();
  const width = 100;
  const height = 100;
  const minimap = new G6.Minimap({ size: [150, 100] });
  const graph = new G6.Graph({
    container,
    width,
    height,
    fitCenter: true,
    fitViewPadding: 50,
    // layout: { type: "pkg-layout" },
    modes: {
      default: [
        "drag-canvas",
        "click-select",
        {
          type: "activate-relations",
          trigger: "mouseenter",
        },
        {
          type: "zoom-canvas",
          sensitivity: 1,
        },
        {
          type: "tooltip",
          formatText(model) {
            return getFullPackageName(model);
          },
        },
        {
          type: "edge-tooltip",
          formatText(model) {
            const nodeMap = model.nodeMap;
            const sourceNode = nodeMap.get(model.source);
            const targetNode = nodeMap.get(model.target);
            const text = `
                  Source: ${getFullPackageName(sourceNode)}<br />
                  Target：${getFullPackageName(targetNode)}<br />
                  Count：${model.count}
              `;
            return text;
          },
        },
      ],
    },
    edgeStateStyles: {
      active: {
        stroke: "red",
        strokeOpacity: 1,
        labelCfg: {
          style: { fill: "#f00" },
        },
      },
    },
    defaultNode: { type: "pkg-node", size: [400, 30] },
    defaultEdge: { type: "pkg-line" },
    plugins: [minimap],
  });

  const graphUtil = {
    load(newData) {
      data.load(newData);
      this.render();
    },
    render() {
      graph.data(data.render());
      graph.render();
    },
    collapseAll() {
      data.nodes.forEach((node) => (node.collapse = true));
      this.render();
    },
    expandAll() {
      data.nodes.forEach((node) => (node.collapse = false));
      this.render();
    },
    changeSize(width, height) {
      graph.changeSize(width, height);
      graph.refresh();
    },
  };

  graph.on("node:click", (ev) => {
    const node = ev.item.getModel();
    if (node.children && node.children.length > 0) {
      node.collapse = !node.collapse;
      graphUtil.render();
    }
  });

  return graphUtil;
}
