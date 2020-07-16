import React from "react";
import { Row, Col, Input, Button, notification } from "antd";
import CodeEditor from "./components/CodeEditor";

import { transformPlsqlToKotlin } from "@/api/addition/plsqlToKotlin";

export default class PlsqlToKotlin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plsqlCode: "",
      kotlinCode: "",
      packageName: "",
    };
  }

  onChange(id, value) {
    this.setState({ [id]: value });
  }

  validate() {
    if (!this.state.packageName) {
      return { isValidate: false, message: "包名不能为空" };
    }

    if (!this.state.plsqlCode) {
      return { isValidate: false, message: "PL/SQL code 不能为空" };
    }

    return { isValidate: true, message: "" };
  }

  transformCode() {
    const validate = this.validate();
    if (!validate.isValidate) {
      notification.warn({
        message: validate.message,
      });
      return;
    }
    transformPlsqlToKotlin(this.state.packageName, this.state.plsqlCode).then((res) => {
      this.setState({ kotlinCode: res });
    });
  }

  render() {
    return (
      <div>
        <Input placeholder="包名" onChange={(e) => this.onChange("packageName", e.target.value)} />
        <Row style={{ marginTop: "16px" }}>
          <Col span={11}>
            <h3>PL/SQL code</h3>
            <CodeEditor
              language="sql"
              value={this.state.plsqlCode}
              onChange={(value) => this.onChange("plsqlCode", value)}
            />
          </Col>
          <Col span={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="primary" onClick={() => this.transformCode()}>
                转换
              </Button>
            </div>
          </Col>

          <Col span={11}>
            <h3>Kotlin Code</h3>
            <CodeEditor
              language="text/x-kotlin"
              value={this.state.kotlinCode}
              onChange={(value) => this.onChange("kotlinCode", value)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
