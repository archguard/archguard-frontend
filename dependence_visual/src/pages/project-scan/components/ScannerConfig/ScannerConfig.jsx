import React, { Fragment } from "react";
import { Input, Switch, Button, Card, notification, Popover } from "antd";
import QuestionCircleOutlined from "@ant-design/icons/QuestionCircleOutlined";
import lodash from "lodash";

import { scanTools } from "./config";

import { queryScannerConfig, updateScannerConfig } from "../../../../api/scanner/ScannerConfig";

import "./ScannerConfig.css";

// import "mock/scanner";

export default class ScanToolsConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      configs: [],
      hidden: false,
    };
  }

  componentDidMount() {
    queryScannerConfig().then((res) => {
      this.setState({ configs: res });
    });
  }

  onChange(type, key, value) {
    const configs = this.state.configs;
    for (let i = 0; i < configs.length; i++) {
      if (configs[i].type === type && configs[i].key === key) {
        configs[i].value = value;
        break;
      }
    }
    this.setState({ configs });
  }

  onSaveClick() {
    console.log("configs", this.state.configs);
    updateScannerConfig(this.state.configs).then((res) => {
      if (res.success) {
        notification.success({
          message: "保存扫描工具配置成功",
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  }

  renderHelp(type) {
    const tool = scanTools[type];
    if (!tool) return;
    return (
      <Popover
        content={
          <div style={{ whiteSpace: "pre-line" }}>
            <p>{tool.introduction}</p>
            {tool.configuration && (
              <div>
                <b>配置项</b>
                {tool.configuration.map((item) => (
                  <p>{item}</p>
                ))}
              </div>
            )}
            <a href="https://archguard.org/" target="view_window">
              查看详情
            </a>
          </div>
        }
        title={tool.integration.join(" + ")}
      >
        {" "}
        <QuestionCircleOutlined />
      </Popover>
    );
  }

  renderToolItems(configs) {
    const tools = lodash.groupBy(configs, (item) => item.type);
    const toolList = [];
    for (let tool in tools) {
      const available =
        tools[tool][tools[tool].findIndex((item) => item.key === "available")].value;
      toolList.push({
        type: tool,
        available,
        configs: tools[tool].filter((item) => item.key !== "available"),
      });
    }

    return (
      <Fragment>
        {toolList.map((tool) => {
          return (
            <div key={tool.type}>
              <Card
                title={
                  <div>
                    {tool.type}
                    {this.renderHelp(tool.type)}
                  </div>
                }
                extra={
                  <Switch
                    defaultChecked={tool.available === "true"}
                    onChange={(checked) =>
                      this.onChange(tool.type, "available", checked ? "true" : "false")
                    }
                  />
                }
              >
                <div>
                  {tool.configs.map((configItem) => (
                    <Input
                      key={configItem.key}
                      placeholder={configItem.key}
                      defaultValue={configItem.value}
                      onChange={(e) => this.onChange(tool.type, configItem.key, e.target.value)}
                    ></Input>
                  ))}
                </div>
              </Card>
            </div>
          );
        })}
      </Fragment>
    );
  }

  render() {
    this.renderToolItems(this.state.configs);
    return (
      <div className="scanner-config">
        {/* <Button onClick={() => this.setState({ hidden: !this.state.hidden })}>
          {this.state.hidden ? "查看配置" : "收起配置"}
        </Button> */}
        <div style={this.state.hidden ? { display: "none" } : {}}>
          <div className="tool-item">
            {this.renderToolItems(this.state.configs)}
            <div style={{ textAlign: "center" }}>
              <Button type="primary" onClick={() => this.onSaveClick()}>
                保存配置
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
