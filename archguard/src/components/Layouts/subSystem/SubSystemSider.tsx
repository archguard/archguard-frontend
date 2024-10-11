import React from "react";
import { Menu } from "antd";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import CloudSyncOutlined from "@ant-design/icons/CloudSyncOutlined";
import FileTextOutlined from "@ant-design/icons/FileTextOutlined";
import { SettingOutlined } from "@ant-design/icons";
import { useParams } from "umi";
import { useIntl } from "@@/plugin-locale/localeExports";

export const BUILD_TARGET = process.env.BUILD_TARGET || "default";

export function configForTargets(configs: { [key: string]: any }) {
  const config = configs[BUILD_TARGET];
  return config || configs["default"];
}


export default function SubSystemSider(props: any) {
  const { systemId } = useParams();
  const { formatMessage } = useIntl();

  const bottomMenu = configForTargets({
    default: [
      {
        key: "metricConfig",
        text: formatMessage({ id: 'MENU_METRIC_CONFIG' }),
        icon: <SettingOutlined />,
        children: [
          { key: "/systemEvolving/BadSmellThreshold", text: formatMessage({ id: 'MENU_BAD_SMELL_THRESHOLD' }) },
          { key: "/systemEvolving/QualityGateProfile", text: formatMessage({ id: 'MENU_QUALITY_GATE_PROFILE' }) },
        ],
      },
    ],
  });

  const menuList = configForTargets({
    default: [
      { key: "/systemSummary/Summary", text: formatMessage({ id: 'MENU_SYSTEM_SUMMARY' }) },
      {
        key: "systemEvaluation",
        text: formatMessage({ id: 'MENU_SYSTEM_EVALUATION' }),
        icon: <FileTextOutlined />,
        children: [
          { key: "/systemEvaluation/SizingEvaluation", text: formatMessage({ id: 'MENU_SIZING_EVALUATION' }) },
          { key: "/systemEvaluation/CouplingEvaluation", text: formatMessage({ id: 'MENU_COUPLING_EVALUATION' }) },
          { key: "/systemEvaluation/CohesionEvaluation", text: formatMessage({ id: 'MENU_COHESION_EVALUATION' }) },
          { key: "/systemEvaluation/Redundancy", text: formatMessage({ id: 'MENU_REDUNDANCY_EVALUATION' }) },
          { key: "/systemEvaluation/TestEvaluation", text: formatMessage({ id: 'MENU_TEST_EVALUATION' }) },
        ],
      },
      {
        key: "analysis",
        text: formatMessage({ id: 'MENU_ARCHITECTURE_ANALYSIS' }),
        icon: <BarChartOutlined />,
        children: [
          { key: "/systemAnalysis/Issue", text: formatMessage({ id: 'MENU_ISSUE_ANALYSIS' }) },
          { key: "/systemAnalysis/ApiAnalysis", text: formatMessage({ id: 'MENU_API_ANALYSIS' }) },
        ],
      },
      {
        key: "systemEvolving",
        text: formatMessage({ id: 'MENU_METRIC_ANALYSIS' }),
        icon: <CloudSyncOutlined />,
        children: [
          { key: "/analysis/metric", text: formatMessage({ id: 'MENU_METRIC_ANALYSIS_DETAIL' }) },
          { key: "/systemEvolving/MeasureIndicators", text: formatMessage({ id: 'MENU_METRIC_DASHBOARD' }) },
        ],
      },
    ],
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
      <Menu
        theme="light"
        mode="inline"
        onClick={(e) => props.history.push(e.key)}
        defaultOpenKeys={['systemEvaluation', 'analysis', 'systemEvolving']}
        selectedKeys={[props.location.pathname]}
      >
        {menuList.map((item: any) => {
          return renderMenuItem(item);
        })}
      </Menu>

      <Menu
        theme="light"
        mode="inline"
        onClick={(e) => props.history.push(e.key)}
        defaultOpenKeys={[props.location.pathname]}
        selectedKeys={[props.location.pathname]}
      >
        {bottomMenu.map((item: any) => {
          return renderMenuItem(item);
        })}
      </Menu>
    </div>
  );
}
