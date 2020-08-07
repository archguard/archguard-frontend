import { Graph } from "@antv/g6";
import React, { useEffect, useMemo, useState } from "react";
import FullscreenContainer from "../../components/fullscreen-container";
import GraphView from "../../components/graph-view";
import GraphNavigator from "./navigator";
import "./node";
import "./styles.less";
import GraphToolbar from "./toolbar";
import type { DepsGraphData, DepsGraphNode, GraphNavigatorPath } from "./types";
import { getNodeSize } from "./util";

const data: DepsGraphData = {
  nodes: [
    {
      title: "consumer-sample",
      id: "module1",
      nodeType: "module",
      subNodes: [
        {
          title: "com.thoughtworks.archgurd.pkg",
          id: "package1",
          nodeType: "package",
          subNodes: [
            {
              title: "Model",
              id: "node5",
              nodeType: "class",
            },
          ],
        },
        {
          title: "com.thoughtworks.archgurd.util",
          id: "package2",
          nodeType: "package",
        },
      ],
    },
    {
      title: "dubbo-spring-boot-actuator",
      id: "module2",
      nodeType: "module",
    },
    {
      title: "dubbo-spring-boot-autoconfigure",
      id: "module3",
      nodeType: "module",
    },
  ],
  edges: [
    {
      id: "edge1",
      source: "module2",
      target: "module1",
    },
    {
      id: "edge2",
      source: "module3",
      target: "module1",
    },
  ],
};

const options = {
  layout: {
    type: "force",
    preventOverlap: true,
  },
  groupByTypes: false,
  fitCenter: true,
  modes: {
    default: ["drag-canvas", "drag-node", "zoom-canvas"],
  },
  defaultNode: {
    type: "deps-node",
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

  const sizedData = useMemo(() => {
    const sizingAndRelationg = (node: DepsGraphNode) => {
      node.size = getNodeSize(node.title);
      node.subNodes?.forEach((child) => {
        child.parent = node;
        sizingAndRelationg(child);
      });
    };
    data?.nodes.forEach(sizingAndRelationg);
    return data ?? { edges: [], nodes: [] };
  }, [data]);

  useEffect(() => {
    if (graph) {
      graph.data(sizedData);
      graph.render();
      const rootPath = { title: "root", data: sizedData };
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

          const paths = getNavPaths(sizedData, model);
          setNavPath(paths);
          setCurrentPath(paths[paths.length - 1]);
        }
      });
    }
  }, [graph, sizedData]);

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
