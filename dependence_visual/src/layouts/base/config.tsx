import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import CloudSyncOutlined from "@ant-design/icons/CloudSyncOutlined";
import FileTextOutlined from "@ant-design/icons/FileTextOutlined";
import React from "react";
import { configForTargets } from "../../config/buildTargets";

export const menuList = configForTargets({
  default: [
    { key: "/Summary", text: "总览" },
    {
      key: "systemEvaluation",
      text: "架构评估",
      icon: <FileTextOutlined />,
      children: [
        { key: "/systemEvaluation/SizingEvaluation", text: "体量维度" },
        { key: "/systemEvaluation/CouplingEvaluation", text: "耦合维度" },
        { key: "/systemEvaluation/CohesionEvaluation", text: "内聚维度" },
        { key: "/systemEvaluation/Redundancy", text: "冗余维度" },
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
