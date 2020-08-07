import { Breadcrumb } from "antd";
import React from "react";
import type { GraphNavigatorPath } from "./types";

const BreadcrumbItem = Breadcrumb.Item;

interface GraphNavigatorProps {
  paths: GraphNavigatorPath[];
  onChange?(path: GraphNavigatorPath): void;
  current?: GraphNavigatorPath;
}

export default function GraphNavigator(props: GraphNavigatorProps) {
  const { paths, onChange, current } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        background: "#d6ecff",
        padding: "2px 10px",
        borderRadius: "0 0 10px 0",
      }}
    >
      <Breadcrumb>
        {paths.map((path, index) => {
          const selected = path === current;
          return (
            <BreadcrumbItem
              key={path.title + index}
              onClick={() => {
                onChange && onChange(path);
              }}
            >
              <a style={{ color: selected ? "#1890ff" : "" }}>{path.title}</a>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </div>
  );
}
