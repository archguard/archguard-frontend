import React from "react";
import { Card, Drawer } from "antd";
import { connect } from "react-redux";
import ConfigBox from "components/ConfigBox";
import {
  createConfig,
  updateConfig,
  deleteConfig,
} from "api/dependence/dependenceConfig";
import { configType } from "./config";
import { resetConfig } from "../actions/config";
import { hiddenConfig } from "../actions/configVisible";

// import "../../../mock/config";

class Config extends React.Component {
  render() {
    return (
      <Drawer
        title="配置"
        placement="right"
        width="50%"
        visible={this.props.configVisible}
        onClose={() => this.props.hiddenConfig()}
      >
        <div>
          {configType.map((item) => {
            return (
              <Card
                title={item.label}
                style={{ marginBottom: "20px" }}
                key={item.type}
              >
                <ConfigBox
                  label={item.label}
                  formItems={item.formItems}
                  data={this.props.config[item.type]}
                  createItem={createConfig}
                  updateItem={updateConfig}
                  deleteItem={deleteConfig}
                  resetConfigs={(configData) =>
                    this.props.resetConfig(configData)
                  }
                />
              </Card>
            );
          })}
        </div>
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.dependence.config,
    configVisible: state.dependence.configVisible,
  };
}

const mapDispatchToProps = {
  resetConfig,
  hiddenConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(Config);
