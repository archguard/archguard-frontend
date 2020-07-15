import React from "react";
import { Button, notification, Row, Col } from "antd";
import ConfigItem from "./components/ConfigItem";
import "./ConfigBox.css";

export default class ConfigBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: this.props.data || [],
      showNewItem: false,
      buttonsSpan:
        24 -
        this.props.formItems
          .filter((item) => !item.hidden)
          .reduce((sum, item) => sum + item.span, 0),
    };
  }

  componentDidMount() {
    this.refresh();
  }

  renderAddItem() {
    if (this.state.showNewItem) {
      return (
        <ConfigItem
          key="temp"
          isNewItem={true}
          formItems={this.props.formItems}
          addItem={(item) => this.addItem(item)}
        />
      );
    } else {
      return (
        <Button
          type="primary"
          onClick={() => this.setState({ showNewItem: true })}
        >
          新增
        </Button>
      );
    }
  }

  resetDataList(dataList) {
    this.setState(dataList);
    if (this.props.resetConfigs) {
      this.props.resetConfigs(dataList);
    }
  }

  refresh() {
    if (this.props.queryData) {
      this.props.queryData().then((res) => {
        this.setState({ dataList: res });
      });
    }
  }

  updateItem(item) {
    this.props.updateItem(item).then((res) => {
      const dataList = this.state.dataList;
      dataList.forEach((configItem) => {
        if (configItem.id === item.id) {
          configItem = item;
        }
      });
      this.resetDataList(dataList);
      notification.success({
        message: "修改" + this.props.label + "成功！",
      });
    });
  }

  addItem(item) {
    this.props.createItem(item).then((res) => {
      notification.success({
        message: "新增" + this.props.label + "成功！",
      });
      const dataList = this.state.dataList;
      dataList.push({ ...item, id: res.id });
      this.resetDataList(dataList);
      this.setState({ showNewItem: false });
    });
  }

  deleteItem(id) {
    this.props.deleteItem({ id }).then((res) => {
      notification.success({
        message: "删除" + this.props.label + "成功！",
      });
      const index = this.state.dataList.findIndex((item) => item.id === id);
      const dataList = this.state.dataList;
      dataList.splice(index, 1);
      this.resetDataList(dataList);
    });
  }

  render() {
    return (
      <div className="config-box">
        <Row gutter={16}>
          {this.props.formItems.map((item) => {
            if (item.hidden) return null;
            return (
              <Col span={item.span} key={item.id}>
                <p>{item.label}</p>
              </Col>
            );
          })}
        </Row>

        {this.state.dataList.map((item, index) => {
          return (
            <ConfigItem
              key={item.id}
              item={item}
              buttonsSpan={this.state.buttonsSpan}
              formItems={this.props.formItems}
              updateItem={(item) => this.updateItem(item)}
              deleteItem={(id) => this.deleteItem(id)}
            />
          );
        })}
        {this.renderAddItem()}
      </div>
    );
  }
}
