import React, { useState } from "react";
import { useMount } from "react-use";
import _ from "lodash";
import { Card, Drawer, notification } from "antd";
import ConfigForm from "./ConfigForm";
import {
  queryConfig,
  updateConfiguration,
} from "@/api/dependence/dependenceConfig";
import { configType } from "./config.ts";

import "@/mock/config";

const DependenceConfig = (props) => {
  const { visible, hide } = props;
  const [configData, setConfigData] = useState({});

  useMount(() => {
    getConfigData()
  });

  const getConfigData = () => {
    queryConfig().then((res) => {
      setConfigData(_.groupBy(res, (item) => item.type));
    });
  }

  const updateConfigData = (data) => {
    const type = Object.keys(data)[0]

    updateConfiguration(type, data[type])
      .then(() => {
        notification.success({
          message: '保存成功'
        })
      })
  }

  return (
    <Drawer title="配置" placement="right" width="50%" visible={visible} onClose={() => hide()}>
      <div>
        {configType.map((item) => {
          return (
            <Card
              key={item.type}
              title={item.label}
              style={{ marginBottom: "20px" }}>
              <ConfigForm
                formItems={item.formItems}
                configType={item.type}
                data={configData}
                updateConfig={updateConfigData}
              />
            </Card>
          );
        })}
      </div>
    </Drawer>
  );
}

export default DependenceConfig
