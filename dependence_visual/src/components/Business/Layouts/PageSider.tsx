import React from "react";
import { Menu } from "antd";
import { useMount } from "ahooks";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import CloudSyncOutlined from "@ant-design/icons/CloudSyncOutlined";
import FileTextOutlined from "@ant-design/icons/FileTextOutlined";
import { storage } from "@/store/storage/sessionStorage";

export const BUILD_TARGET = process.env.BUILD_TARGET || "default";

export function configForTargets(configs: { [key: string]: any }) {
  const config = configs[BUILD_TARGET];
  return config || configs["default"];
}

const menuList = configForTargets({
  default: [
    { key: "/systemSummary/Summary", text: "总览" },
    {
      key: "systemEvaluation",
      text: "架构评估",
      icon: <FileTextOutlined />,
      children: [
        { key: "/systemEvaluation/SizingEvaluation", text: "体量维度" },
        { key: "/systemEvaluation/CouplingEvaluation", text: "耦合维度" },
        { key: "/systemEvaluation/CohesionEvaluation", text: "内聚维度" },
        { key: "/systemEvaluation/Redundancy", text: "冗余维度" },
        {
          key: "/systemEvaluation/TestEvaluation",
          text: "测试维度"
        }
      ],
    },
    {
      key: "analysis",
      text: "架构分析",
      icon: <BarChartOutlined />,
      children: [
        { key: "/analysis/dependence", text: "依赖分析" },
        { key: "/analysis/metric", text: "指标分析" },
      ],
    },
    {
      key: "systemEvolving",
      text: "架构演进",
      icon: <CloudSyncOutlined />,
      children: [{ key: "/systemEvolving/QualityGateProfile", text: "质量阀" }],
    },
  ],
  zh: [
    {
      key: "analysisTools",
      text: "架构分析",
      icon: <BarChartOutlined />,
      children: [{ key: "/analysis/dependence", text: "依赖分析" }],
    },
  ],
});

export default function PageSider(props: any) {
  const systemId = storage.getSystemId();

  useMount(() => {
    if (systemId === null) {
      const id = props.location.pathname.split("/")[1];
      storage.setSystemId(id);
    }
  });

  const renderMenuItem = (item: any) => {
    if (!item) return;
    if (!item.children) {
      return (
        <Menu.Item key={`/${systemId}${item.key}`}>
          {item.icon}
          <span className="nav-text">{item.text}</span>
        </Menu.Item>
      );
    }

    return (
      <Menu.SubMenu
        key={item.key}
        title={
          <span>
            {item.icon}
            <span className="nav-text">{item.text}</span>
          </span>
        }
      >
        {item.children.map((subItem: any) => {
          return renderMenuItem(subItem);
        })}
      </Menu.SubMenu>
    );
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      onClick={(e) => props.history.push(e.key)}
      defaultOpenKeys={[props.location.pathname]}
      selectedKeys={[props.location.pathname]}
    >
      {menuList.map((item: any) => {
        return renderMenuItem(item);
      })}
    </Menu>
  );
}
