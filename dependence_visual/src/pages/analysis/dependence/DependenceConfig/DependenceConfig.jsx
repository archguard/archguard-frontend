import React, { useState } from "react";
import { useMount } from "react-use";
import _ from "lodash";
import { Card, Drawer } from "antd";
import ConfigBox from "components/ConfigBoxHook";
import {
  queryConfig,
  createConfig,
  updateConfig,
  deleteConfig,
} from "api/dependence/dependenceConfig";
import { configType } from "./config";

import "@/mock/config";

function DependenceConfig(props) {
  const { visible, hide } = props;

  const [configData, setConfigData] = useState({});

  useMount(() => {
    queryConfig().then((res) => {
      setConfigData(_.groupBy(res, (item) => item.type));
    });
  });

  return (
    <Drawer title="配置" placement="right" width="50%" visible={visible} onClose={() => hide()}>
      <div>
        {configType.map((item) => {
          return (
            <Card title={item.label} style={{ marginBottom: "20px" }} key={item.type}>
              <ConfigBox
                label={item.label}
                formItems={item.formItems}
                data={configData[item.type]}
                createItem={createConfig}
                updateItem={updateConfig}
                deleteItem={deleteConfig}
              />
            </Card>
          );
        })}
      </div>
    </Drawer>
  );
}

export default DependenceConfig;
