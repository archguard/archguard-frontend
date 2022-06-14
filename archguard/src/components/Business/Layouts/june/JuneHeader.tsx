import React, { useState } from "react";
import { Button, Modal } from "antd";
import { setLocale, useIntl } from "@@/plugin-locale/localeExports";
import { GlobalOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { FEATURES, getFeature } from "@/components/Business/Layouts/PageHeader";
import Help from "@/pages/help";
import "./JuneLayout.less";
import "antd/dist/antd.less";

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

  return (
    <div className="multiple-system-header">
      <div className="header-logo">
        <img src={require("@/assets/images/logo-small.png")} alt="logo" />
        <span className="slogan">守护架构，放权代码</span>
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
