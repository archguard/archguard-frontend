import React, { Fragment } from "react";
import { Card, Button } from "antd";
import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";

export default class CollapsibleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed === false || true,
    };
  }

  onClick() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const title = (
      <Fragment>
        <Button
          icon={this.state.collapsed ? <CaretRightOutlined /> : <CaretDownOutlined />}
          type="text"
          onClick={() => this.onClick()}
        />
        {this.props.title}
      </Fragment>
    );

    return (
      <div>
        <Card size={this.props.size} title={title} extra={this.props.extra}>
          <div style={{ display: this.state.collapsed ? "none" : undefined }}>
            {this.props.children}
          </div>
        </Card>
      </div>
    );
  }
}
