import { forEach } from "lodash";
import { Util } from "@antv/g6/es";
import ELK from "elkjs/lib/elk.bundled";
import { G6GraphData, GNode, GEdge } from "@/models/graph";

type Node = GNode;
type Edge = GEdge;

type LayoutOptions = {
  getWidth?: (node: Node) => number;
  getHeight?: (node: Node) => number;
  [key: string]: string | Function | any;
};

/***
 * elk布局计算是异步的，而在g6的布局类里面是拿不到graph实例的，
 * 所以必须不能注册对应的算法，就算计算了生效时间也不定
 * 需要先计算布局，之后人工调用graph.data进行展示
 *
 * new ELKLayout({}).layout(data.nodes, data.edges).then(() => {
      graph.data(data);
      graph.render();
      graph.fitView();
    });
 */
export class ELKLayout {
  elk!: ELK;
  options!: LayoutOptions;
  constructor(options = {}) {
    /***
     * elk 支持的算法：'layered', 'stress', 'mrtree', 'radial', 'force', 'disco'
     * 当前不知道内部参数，只有layered看起来还正常，其它布局都很乱
     */
    const defaultOptions = {
      "elk.algorithm": "layered",
      zoomToFit: true,
      separateConnectedComponents: false,
      ...options,
    };
    this.options = options;
    this.elk = new ELK({ defaultLayoutOptions: defaultOptions });
  }
  getWidth(node: Node) {
    const { getWidth } = this.options;
    const [width] = Util.getTextSize(node.name, 12);
    return getWidth ? getWidth(node) : width;
  }
  getHeight(node: Node) {
    const { getHeight } = this.options;
    return getHeight ? getHeight(node) : 30;
  }
  normalizeNodes(nodes: Node[]) {
    forEach(nodes, (node) => {
      delete node.children;
      node.width = this.getWidth(node);
      node.height = this.getHeight(node);
    });
    return nodes;
  }
  normalizeEdges(edges: Edge[]) {
    forEach(edges, (edge) => {
      if (!edge.id) {
        edge.id = `${edge.source}-${edge.target}`;
      }
    });
    return edges;
  }
  layout(graphData: G6GraphData) {
    const { nodes, edges } = graphData;
    const graph = {
      id: "root",
      children: this.normalizeNodes(nodes),
      edges: this.normalizeEdges(edges),
    };
    return this.elk.layout(graph);
  }
}
