import {
  ApartmentOutlined,
  BranchesOutlined,
  ChromeOutlined,
  LayoutOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Graph } from "@antv/g6";
import { Popover, Radio, Tooltip } from "antd";
import React, { useEffect, useState } from "react";

interface GraphOperationProps {
  graph?: Graph;
}

const layouts = [
  {
    title: "力导向布局",
    icon: <BranchesOutlined />,
    type: "force",
    preventOverlap: true,
  },
  {
    title: "环形布局",
    icon: <ChromeOutlined />,
    type: "circular",
  },
  {
    title: "流程图布局",
    icon: <ApartmentOutlined />,
    type: "dagre",
  },
  {
    title: "Fruchterman力导向布局",
    icon: <BranchesOutlined />,
    type: "fruchterman",
  },
];

export default function GraphToolbar(props: GraphOperationProps) {
  const { graph } = props;
  if (!graph) return null;

  const [layoutOptions, setLayoutOptions] = useState({});

  useEffect(() => {
    graph.getNodes().forEach((node) => {
      delete node.getModel().x;
      delete node.getModel().y;
    });
    graph.updateLayout(layoutOptions);
    graph.fitCenter();
  }, [layoutOptions]);

  const onSave = () => {
    graph.downloadFullImage(`exported_${Date.now()}`, "image/png");
  };

  return (
    <div className="toolbar">
      <Popover
        placement="bottom"
        title="布局方案"
        content={
          <div className="deps-graph-popover">
            <Radio.Group
              onChange={(v) => setLayoutOptions(v.target.value)}
              className="layout"
              value={layoutOptions}
            >
              {layouts.map((layout) => {
                return (
                  <Radio key={layout.type} value={layout}>
                    {layout.icon} {layout.title}
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
        }
      >
        <LayoutOutlined />
      </Popover>

      <Tooltip title="保存图片">
        <SaveOutlined onClick={onSave} />
      </Tooltip>
    </div>
  );
}
