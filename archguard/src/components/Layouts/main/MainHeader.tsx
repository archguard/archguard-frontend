import React, { useState } from "react";
import { Button, Menu, MenuProps, Modal } from "antd";
import { setLocale, useIntl } from "@@/plugin-locale/localeExports";
import {
  GlobalOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import { FEATURES, getFeature } from "@/components/Layouts/subSystem/SubSystemHeader";
import Help from "@/components/Layouts/main/help/Help";

import "./MainLayout.less";
import "antd/dist/antd.less";

const pkg = require('../../../../package.json');

export default function MainHeader(props: any) {
  const { formatMessage } = useIntl();
  const [currentLanguage, setCurrentLanguage] = useState("zh-CN");
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  const version = pkg.version;

  const setLanguage = () => {
    if (currentLanguage === "zh-CN") {
      setCurrentLanguage("en-US");
    } else {
      setCurrentLanguage("zh-CN");
    }

    setLocale(currentLanguage, false);
  };

  const HomeMenus: MenuProps['items'] = [
    { key: "/insights/home", label: formatMessage({ id: "MENU_TRENDS" }) },
    { key: "/analysis/home", label: formatMessage({ id: "MENU_SUB_SYSTEM" }) },
    { key: "/analysis/code-analysis", label: formatMessage({ id: "MENU_CODE_ANALYSIS" }) },
    { key: "/analysis/change-diff", label: formatMessage({ id: "MENU_CHANGE_DIFF" })},
    { key: "/visual/database-map", label: formatMessage({ id: "MENU_DATABASE_MAP" }) },
    { key: "/visual/services-map", label: formatMessage({ id: "MENU_SERVICES_MAP" }) },
    { key: "/workbench/home", label: formatMessage({ id: "MENU_WORKBENCH" }) },
    { key: "/visual/message-map", label: formatMessage({ id: "MENU_MESSAGE_MAP" }), disabled: true },
  ]

  const onClick: MenuProps['onClick'] = e => {
    props.history.push(e.key);
  };

  return (
    <div className="multiple-system-header">
      <div className="header-logo">
        <img src={require("@/assets/images/logo-small.png")} alt="logo" />
        <span className="slogan">{ formatMessage({ id: "SLOGAN" })}</span>
      </div>
      <div className="header-menu">
        <Menu mode="horizontal" onClick={onClick} selectedKeys={[props.location.pathname]} items={HomeMenus} />
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
          <span className="version-info">{version}</span>
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
