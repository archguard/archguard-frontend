import GraphView from '@/components/Business/GraphView';
import G6, { Graph } from "@antv/g6";
import { GraphOptions } from "@antv/g6/lib/types";
import ELK from "elkjs";
import React, { useEffect, useMemo, useState } from "react";
import FullscreenContainer from '../FullscreenContainer';
import GraphNavigator from "./navigator";
import "./node";
import "./styles.less";
import GraphToolbar from "./toolbar";
import {
  DepsGraphData,
  DepsGraphNode,
  DepsNodeSize,
  DepsNodeType,
  GraphNavigatorPath,
} from "./types";
import { getNodeSize } from "./util";

const elk = new ELK();

const options: Partial<GraphOptions> = {
  groupByTypes: false,
  fitCenter: true,
  modes: {
    default: ["drag-canvas", "drag-node", "zoom-canvas"],
  },
  defaultNode: {
    type: "deps-node",
  },
  defaultEdge: {
    type: "polygon",
    style: {
      endArrow: {
        path: G6.Arrow.triangle(3, 5),
      },
    },
  },
};

interface DepsGraphProps {
  data?: DepsGraphData;
}

export default function DepsGraph(props: DepsGraphProps) {
  const { data } = props;
  const [graph, setGraph] = useState<Graph>();
  const [navPath, setNavPath] = useState<GraphNavigatorPath[]>([]);
  const [currentPath, setCurrentPath] = useState<GraphNavigatorPath>();
  const [renderData, setRenderData] = useState<DepsGraphData>({ nodes: [], edges: [] });

  const sizedData = useMemo(() => {
    const sizingAndRelationg = (node: DepsGraphNode) => {
      node.size = getNodeSize(node.title);
      // eslint-disable-next-line no-unused-expressions
      node.subNodes?.forEach((child) => {
        child.parent = node;
        sizingAndRelationg(child);
      });
    };
    // eslint-disable-next-line no-unused-expressions
    data?.nodes.forEach(sizingAndRelationg);
    return data ?? { edges: [], nodes: [] };
  }, [data]);

  useEffect(() => {
    elk
      .layout({
        id: "root",
        layoutOptions: { "elk.algorithm": "layered" },
        children: sizedData.nodes.map((node) => {
          const [width, height] = node.size ?? [10, 10];
          return { width, height, id: node.id, labels: [{ text: node.title, id: "" }] };
        }),
        edges: sizedData.edges.map((edge) => {
          return { id: edge.id, sources: [`${edge.source}`], targets: [`${edge.target}`] };
        }),
      })
      .then(({ children, edges }) => {
        const data = {
          nodes:
            children?.map(({ id, width = 0, height = 0, x = 0, y = 0, labels }) => {
              const label = labels![0];
              return {
                id,
                size: [width, height] as DepsNodeSize,
                x,
                y,
                title: label.text,
                nodeType: DepsNodeType.MODULE,
              };
            }) ?? [],
          edges:
            edges?.map((e: any) => {
              const [section] = e.sections;
              const { bendPoints = [], startPoint, endPoint } = section;
              return {
                id: e.id,
                type: "polyline",
                source: e.sources[0],
                target: e.targets[0],
                startPoint,
                endPoint,
                controlPoints: [startPoint, ...bendPoints, endPoint],
              };
            }) ?? [],
        };
        setRenderData(data);
      });
  }, [sizedData]);

  useEffect(() => {
    if (graph) {
      graph.data(renderData);
      graph.render();
      const rootPath = { title: "root", data: renderData };
      setNavPath([rootPath]);
      setCurrentPath(rootPath);

      graph.on("node:dblclick", (evt: any) => {
        const item = evt.item;
        const model = item.getModel();

        const children = model.subNodes ?? [];
        if (children.length > 0) {
          const newData = { ...data, nodes: children };
          graph.data(newData);
          graph.render();

          const paths = getNavPaths(renderData, model);
          setNavPath(paths);
          setCurrentPath(paths[paths.length - 1]);
        }
      });
    }
  }, [graph, renderData]);

  const onNavClick = (path: GraphNavigatorPath) => {
    if (graph) {
      graph.data(path.data);
      graph.render();
      setCurrentPath(path);
    }
  };

  return (
    <FullscreenContainer
      className="deps-graph"
      style={{ height: 600, border: "1px solid #f4f4f4" }}
    >
      <GraphView onInit={setGraph} options={options} />
      <GraphNavigator paths={navPath} onChange={onNavClick} current={currentPath} />
      <GraphToolbar graph={graph} />
    </FullscreenContainer>
  );
}

function getNavPaths(data: DepsGraphData, node?: DepsGraphNode): GraphNavigatorPath[] {
  if (!node) {
    return [];
  }

  const currentPath: GraphNavigatorPath = {
    title: node.title,
    data: { ...data, nodes: node.subNodes ?? [] },
  };

  if (node.parent) {
    const parentPaths = getNavPaths(data, node.parent);
    return [...parentPaths, currentPath];
  } else {
    return [
      {
        title: "root",
        data,
      },
      currentPath,
    ];
  }
}
