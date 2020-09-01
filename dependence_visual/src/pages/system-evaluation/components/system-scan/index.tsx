import { queryScannerConfig, updateScannerConfig } from "@/api/scanner/scanner-config";
import { Button, Card, Input, List, notification, Switch } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { ScannerConfigType } from "../../models/scanner";
import ConfigHelper from "./config-helper";
import "./index.less";

export default function ScanToolsConfig() {
  const [configs, setConfigs] = useState<ScannerConfigType[]>([]);
  useEffect(() => {
    queryScannerConfig().then(setConfigs);
  }, []);

  const toolList = useMemo(() => {
    const tools: {
      [key: string]: {
        available: boolean;
        props: { key: string; value: any }[];
      };
    } = {};

    configs.forEach((config) => {
      if (!tools[config.type]) {
        tools[config.type] = {
          available: false,
          props: [],
        };
      }
      if (config.key === "available") {
        tools[config.type].available = config.value === "true";
      } else {
        tools[config.type].props.push({
          key: config.key,
          value: config.value,
        });
      }
    });

    return Object.keys(tools).map((key) => ({ type: key, ...tools[key] }));
  }, [configs]);

  const onSave = () => {
    updateScannerConfig(configs).then((res: any) => {
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
  };

  const onChange = (type: string, key: string, value: any) => {
    const config = configs.find((config) => config.type === type && config.key === key);
    if (config) {
      config.value = value;
      setConfigs([...configs]);
    }
  };

  return (
    <Card
      className="scanner-config"
      title="扫描配置"
      bordered={false}
      style={{ margin: -32 }}
      extra={
        <Button type="primary" onClick={onSave}>
          保存配置
        </Button>
      }
    >
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={toolList}
        renderItem={(tool) => (
          <List.Item>
            <Card
              title={<ConfigHelper name={tool.type} />}
              extra={
                <Switch
                  defaultChecked={tool.available}
                  onChange={(checked) =>
                    onChange(tool.type, "available", checked ? "true" : "false")
                  }
                />
              }
            >
              <div>
                {tool.props.map((prop) => (
                  <Input
                    key={prop.key}
                    placeholder={prop.key}
                    defaultValue={prop.value}
                    onChange={(e) => onChange(tool.type, prop.key, e.target.value)}
                  ></Input>
                ))}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
}
