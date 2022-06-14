import React, { useState } from "react";
import { Button, Menu, MenuProps, Modal } from "antd";
import { setLocale, useIntl } from "@@/plugin-locale/localeExports";
import {
  GlobalOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import { FEATURES, getFeature } from "@/components/Business/Layouts/PageHeader";
import Help from "@/pages/help";
import "./JuneLayout.less";
import "antd/dist/antd.less";

const HomeMenus = [
  { key: "/workbench/home", text: "交互分析（Alpha）" },
  { key: "/system/home", text: "子系统分析" },
  { key: "/analysis/code-analysis", text: "代码分析" },
  { key: "/visual/database-map", text: "数据库地图" },
  { key: "/visual/services-map", text: "服务地图" },
  { key: "/visual/message-map", text: "消息系统地图" },
]

export default function JuneHeader(props: any) {
  const { formatMessage } = useIntl();
  const [currentLanguage, setCurrentLanguage] = useState("zh-CN");
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  const setLanguage = () => {
    if (currentLanguage === "zh-CN") {
      setCurrentLanguage("en-US");
    } else {
      setCurrentLanguage("zh-CN");
    }

    setLocale(currentLanguage, false);
  };

  const onClick: MenuProps['onClick'] = e => {
    props.history.push(e.key);
  };

  return (
    <div className="multiple-system-header">
      <div className="header-logo">
        <img src={require("@/assets/images/logo-small.png")} alt="logo" />
        <span className="slogan">守护架构，放权代码</span>
      </div>
      <div className="header-menu">
        <Menu mode="horizontal" onClick={onClick} selectedKeys={[props.location.pathname]}>
          {HomeMenus.map((item: any) => (
            <Menu.Item key={`${item.key}`} >
              <span className="nav-text">{item.text}</span>
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <div className="header-user">
        <div>
          <Button icon={<GlobalOutlined />} onClick={() => setLanguage()}>
            {formatMessage({ id: "SWITCH_LANGUAGE" })}
          </Button>
        </div>
        <div>
          <a href="https://archguard.org/faq" target={"_blank"}>
            <Button type="link" style={{ color: "#ffffff" }} icon={<QuestionCircleOutlined />}>
              FAQ
            </Button>
          </a>
        </div>
        <div>
          {getFeature(FEATURES.INSIDE_FEATURE) && (
            <Button
              type="link"
              style={{ color: "#ffffff" }}
              icon={<QuestionCircleOutlined />}
              onClick={() => setHelpModalVisible(true)}
            >
              {formatMessage({ id: "OPERATION_DOCUMENT" })}
            </Button>
          )}
        </div>
      </div>

      <Modal
        onCancel={() => setHelpModalVisible(false)}
        width={1300}
        footer={null}
        maskClosable={true}
        centered
        visible={helpModalVisible}
      >
        <Help />
      </Modal>
    </div>
  );
}
