import React from "react";
import { Button, Col, Input, notification, Row } from "antd";

import {
  createProjectInfo,
  queryProjectInfo,
  updateProjectInfo,
} from "../../../../api/addition/projectInfo";
import Select from "antd/es/select";

const { TextArea } = Input;

export default class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      repo: [],
      repoType: "",
    };
  }

  componentDidMount() {
    queryProjectInfo().then((res) => {
      this.setState(res);
    });
  }

  onChang(id, value) {
    this.setState({ [id]: value });
  }

  onSaveClick() {
    const request = this.state;
    if (!Array.isArray(request.repo)) {
      request.repo = request.repo.split(",");
    }
    if (this.state.id) {
      updateProjectInfo(this.state).then((res) => {
        if (res.success) {
          notification.success({
            message: res.message,
          });
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    } else {
      createProjectInfo(this.state).then((res) => {
        if (res.success) {
          notification.success({
            message: res.message,
          });
          this.setState({ id: res.id });
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Row gutter={16} align="middle" style={{ marginBottom: "8px" }}>
          <Col span={2}>
            <span>项目名称：</span>
          </Col>
          <Col span={6}>
            <Input
              placeholder="项目名称"
              value={this.state.projectName}
              onChange={(e) => this.onChang("projectName", e.target.value)}
            ></Input>
          </Col>
        </Row>
        <Row gutter={16} align="middle" style={{ marginBottom: "8px" }}>
          <Col span={2}>
            <span>仓库类型：</span>
          </Col>
          <Col span={6}>
            <Select
              placeholder="仓库类型"
              value={this.state.repoType}
              onChange={(value) => this.onChang("repoType", value)}
            >
              <Select.Option value={"GIT"}>GIT</Select.Option>
              <Select.Option value={"SVN"}>SVN</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16} align="middle" style={{ marginBottom: "8px" }}>
          <Col span={2}>
            <span>仓库地址：</span>
          </Col>
          <Col span={22}>
            <Input
              placeholder="仓库地址"
              value={this.state.repo}
              onChange={(e) => this.onChang("repo", e.target.value)}
            ></Input>
          </Col>
        </Row>
        {/* <Row gutter={16} align="middle" style={{ marginBottom: "8px" }}>
          <Col span={2}>
            <span>数据库表：</span>
          </Col>
          <Col span={22}>
            <TextArea
              placeholder="数据库表文件内容"
              value={this.state.sql}
              onChange={(e) => this.onChang("sql", e.target.value)}
            ></TextArea>
          </Col>
        </Row> */}
        <Button onClick={() => this.onSaveClick()} style={{ float: "right" }} type="primary">
          保存
        </Button>
      </div>
    );
  }
}
