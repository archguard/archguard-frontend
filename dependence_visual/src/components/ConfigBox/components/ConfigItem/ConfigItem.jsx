import React, { Fragment } from "react";
import { Input, Row, Col, Button, notification, Select } from "antd";

const Option = Select.Option;
export default class ConfigItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.item || {},
    };
  }

  componentDidMount() {
    const formData = this.state.formData;
    if (!this.props.item) {
      this.props.formItems.forEach((item) => {
        formData[item.id] = item.defaultValue;
      });
    }

    this.setState({ formData });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.item !== nextProps.item) {
      this.setState({ formData: nextProps.item });
    }
  }

  onChang(id, value) {
    const formData = this.state.formData;
    formData[id] = value;
    this.setState({ formData });
  }

  renderFormItems(formItems) {
    const formData = this.state.formData;
    return (
      <Fragment>
        {formItems.map((item) => {
          if (item.hidden) return;
          if (item.type === "select") {
            return (
              <Col span={item.span} key={item.id}>
                <Select
                  placeholder={item.label}
                  value={formData[item.id]}
                  mode={item.mode}
                  style={{ width: "100%" }}
                  onChange={(value) => this.onChang(item.id, value)}
                  tokenSeparators={item.tokenSeparators}
                >
                  {item.options.map((item) => {
                    return (
                      <Option value={item.value} key={item.value}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            );
          }
          return (
            <Col span={item.span} key={item.id}>
              <Input
                placeholder={item.label}
                value={formData[item.id]}
                type={item.type}
                onChange={(e) => this.onChang(item.id, e.target.value)}
              ></Input>
            </Col>
          );
        })}
      </Fragment>
    );
  }

  renderButtons(isNewItem) {
    const buttonsSpan = this.props.buttonsSpan;
    if (isNewItem) {
      return (
        <Fragment>
          <Col span={buttonsSpan}>
            <Button onClick={() => this.onCreateClick()}>保存</Button>
          </Col>
        </Fragment>
      );
    } else {
      let hideOrShowButton;
      if (this.state.formData.status === "NORMAL") {
        hideOrShowButton = (
          <Button onClick={() => this.onHideClick()}>隐藏</Button>
        );
      } else if (this.state.formData.status === "HIDE") {
        hideOrShowButton = (
          <Button type="dashed" onClick={() => this.onShowClick()}>
            展示
          </Button>
        );
      }
      return (
        <Fragment>
          <Col span={buttonsSpan}>
            <Button onClick={() => this.onUpdateClick()}>修改</Button>
            <Button danger onClick={() => this.onDeleteClick()}>
              删除
            </Button>
            {hideOrShowButton}
          </Col>
        </Fragment>
      );
    }
  }

  validateFormData(request) {
    for (let item of this.props.formItems) {
      if (!request[item.id]) {
        return { isValidate: false, message: item.label + "不能为空" };
      }
    }
    return { isValidate: true, message: "" };
  }

  validateAndGetFormData() {
    const formData = this.state.formData;
    const validate = this.validateFormData(formData);
    if (!validate.isValidate) {
      notification.warn({
        message: validate.message,
      });
      return false;
    }

    return formData;
  }

  onUpdateClick() {
    const request = this.validateAndGetFormData();
    if (!request) return;
    console.log("update request", request);
    this.props.updateItem(request);
  }

  onCreateClick() {
    const request = this.validateAndGetFormData();
    if (!request) return;
    console.log("create request", request);
    this.props.addItem(request);
  }

  onHideClick() {
    let item = this.state.formData;
    item.status = "HIDE";
    console.log("Hide and update item", item);
    this.props.updateItem(item);
  }

  onShowClick() {
    let item = this.state.formData;
    item.status = "NORMAL";
    console.log("Show and update item", item);
    this.props.updateItem(item);
  }

  onDeleteClick() {
    const id = this.state.formData.id;
    this.props.deleteItem(id);
  }

  render() {
    return (
      <Row gutter={16}>
        {this.renderFormItems(this.props.formItems)}
        {this.renderButtons(this.props.isNewItem)}
      </Row>
    );
  }
}
