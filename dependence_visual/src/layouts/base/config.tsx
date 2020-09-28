import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import CloudSyncOutlined from "@ant-design/icons/CloudSyncOutlined";
import FileTextOutlined from "@ant-design/icons/FileTextOutlined";
import React from "react";
import { configForTargets } from "../../config/buildTargets";

export const menuList = configForTargets({
  default: [
    { key: "/system-evaluation/Summary", text: "总览" },
    {
      key: "systemEvaluation",
      text: "架构评估",
      icon: <FileTextOutlined />,
      children: [
        { key: "/system-evaluation/sizing-evaluation", text: "体量维度" },
        { key: "/system-evaluation/coupling-evaluation", text: "耦合维度" },
        { key: "/system-evaluation/cohesion-evaluation", text: "内聚维度" },
        { key: "/systemEvaluation/Redundancy", text: "冗余维度" },
      ],
    },
    {
      key: "analysisTools",
      text: "架构分析",
      icon: <BarChartOutlined />,
      children: [
        { key: "/analysis/dependence", text: "依赖分析" },
        { key: "/metric", text: "指标分析" },
      ],
    },
    {
      key: "system-evolving",
      text: "架构演进",
      icon: <CloudSyncOutlined />,
      children: [{ key: "/quality-gate-profile", text: "质量阀" }],
    },
    // {
    //   key: "transformTools",
    //   text: "改造工具",
    //   icon: <CloudSyncOutlined />,
    //   children: [
    //     {
    //       key: "/retrofit-tools/plsql-to-kotlin",
    //       text: "PL/SQL转Kotlin",
    //     },
    //   ],
    // },
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
