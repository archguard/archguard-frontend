import G6 from "@antv/g6";
import { GraphOptions } from "@antv/g6/lib/types";

export function create(container: HTMLElement, graphOptions?: Partial<GraphOptions>) {
  const width = 100;
  const height = 100;
  const minimap = new G6.Minimap({ size: [150, 100] });
  const graph = new G6.Graph({
    container,
    width,
    height,
    fitCenter: true,
    fitViewPadding: 50,
    plugins: [minimap],
    ...graphOptions,
  });

  return graph;
}
