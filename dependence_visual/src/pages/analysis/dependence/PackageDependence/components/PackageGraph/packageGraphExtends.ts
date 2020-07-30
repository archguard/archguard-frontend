import G6 from "@antv/g6";
import { mix } from "@antv/util";

const NODE_INDENT = 20;
const NODE_WIDTH = 400;

G6.registerNode("pkg-node", {
  getAnchorPoints(cfg) {
    const edgeCount = cfg.edgeCount || 0;
    const step = 1 / (edgeCount + 1);
    const anchors = [];
    for (let i = 0; i < edgeCount; i++) {
      anchors.push([0, step * (i + 1)]);
    }
    return anchors;
  },

  draw: function drawShape(cfg, group) {
    const r = 8;
    const color = cfg.info.color;
    const width = NODE_WIDTH;
    const indentWidth = NODE_INDENT * cfg.deep;
    const edgeCount = cfg.edgeCount || 0;
    const height = 30 + Math.max(0, edgeCount - 1) * 10;

    group.addShape("rect", {
      attrs: {
        x: indentWidth,
        y: 0,
        width: width - indentWidth,
        height,
        radius: r,
        fill: "#f4f4f4",
      },
      name: "main-box",
      draggable: true,
    });

    const shape = group.addShape("rect", {
      attrs: {
        x: indentWidth,
        y: 0,
        width: 6,
        height,
        radius: [r, 0, 0, r],
        fill: color,
      },
      name: "flag-box",
    });

    group.addShape("text", {
      attrs: {
        textBaseline: "top",
        x: indentWidth + 20,
        y: height / 2 - 7,
        fontSize: 14,
        lineHeight: 20,
        text: cfg.label || cfg.id,
        fill: "#000",
      },
      name: "title",
    });

    group.addShape("text", {
      attrs: {
        textBaseline: "top",
        x: width - 20,
        y: height / 2 - 9,
        fontSize: 18,
        lineHeight: 20,
        text: cfg.children.length > 0 ? (cfg.collapse ? "+" : "-") : "",
        fill: "#888",
      },
      name: "collapse",
    });
    return shape;
  },
});

G6.registerEdge(
  "pkg-line",
  {
    options: {
      style: {
        stroke: "#888",
        lineAppendWidth: 3,
        endArrow: {
          path: G6.Arrow.triangle(3, 5),
          fill: "#f00",
        },
        strokeOpacity: 0.3,
        radius: 10,
        lineWidth: 1,
      },
      // 文本样式配置
      labelCfg: {
        position: "start",
        refX: 10,
        style: {
          fill: "#666",
          fontSize: 10,
          background: {
            fill: "#ffffff60",
            padding: [2, 2, 2, 2],
            radius: 2,
          },
        },
      },
    },
    getShapeStyle(cfg) {
      const { style: defaultStyle } = this.options;
      const style = mix({}, defaultStyle, cfg.style);

      const { startPoint, endPoint, index } = cfg;

      const controlPoints = [
        { x: -20 - index * 10, y: startPoint.y },
        { x: -20 - index * 10, y: endPoint.y },
      ];

      cfg.controlPoints = controlPoints;

      const points = [startPoint, ...controlPoints, endPoint];
      let routeCfg = { radius: style.radius };
      let path = this.getPath(points, routeCfg);

      const attrs = {
        ...style,
        path,
      };
      return attrs;
    },
  },
  "polyline"
);
