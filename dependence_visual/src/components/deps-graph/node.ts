import G6 from "@antv/g6";
import { DepsNodeType } from "./types";

const colors = {
  package: "#F4664A",
  module: "#30BF78",
  class: "#1890ff",
  method: "#ff9c33",
};

const ICONS = {
  module: require("../../assets/module.svg"),
  package: require("../../assets/package.svg"),
  class: require("../../assets/class.svg"),
  method: require("../../assets/method.svg"),
};

const FONT_SIZE = 12;

G6.registerNode(
  "deps-node",
  {
    drawShape: function drawShape(cfg, group) {
      const [titleWidth] = G6.Util.getTextSize(`${cfg?.title}`, FONT_SIZE);
      const boxWidth = 30 + titleWidth;
      const type: DepsNodeType = (cfg?.nodeType as DepsNodeType) || "module";
      const color = colors[type] || cfg?.color || "#F4664A";
      const radius = 2;

      const shape = group!.addShape("rect", {
        attrs: {
          x: 0,
          y: 0,
          width: boxWidth,
          height: 26,
          fill: color,
          radius: [radius, radius, radius, radius],
        },
        name: "title-box",
        draggable: true,
      });

      // left icon
      group!.addShape("image", {
        attrs: {
          x: 4,
          y: 5,
          height: 16,
          width: 16,
          cursor: "pointer",
          img: ICONS[type],
        },
        name: "node-icon",
      });

      // title text
      group!.addShape("text", {
        attrs: {
          textBaseline: "top",
          y: 6,
          x: 24,
          lineHeight: 20,
          text: cfg?.title,
          fill: "#fff",
        },
        name: "title",
        draggable: true,
      });

      return shape;
    },
  },
  "single-node",
);
