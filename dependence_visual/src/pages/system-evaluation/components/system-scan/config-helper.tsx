import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React from "react";
import { scanTools } from "./config";

export default function ConfigHelper(props: { name: string }) {
  const { name } = props;
  const helpConfig = scanTools[name];
  return helpConfig ? (
    <Popover
      title={helpConfig.integration.join(" + ")}
      content={
        <div style={{ whiteSpace: "pre-line" }}>
          <p>{helpConfig.introduction}</p>
          {helpConfig.configuration && (
            <div>
              <b>配置项</b>
              {helpConfig.configuration.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          )}
          <a href="https://archguard.org/" target="view_window">
            查看详情
          </a>
        </div>
      }
    >
      <div>
        {name} <QuestionCircleOutlined />
      </div>
    </Popover>
  ) : null;
}
