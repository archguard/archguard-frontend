import { Button, Input, notification } from "antd";
import Select from "antd/es/select";
import React from "react";
import {
  createProjectInfo,
  queryProjectInfo,
  updateProjectInfo,
} from "../../../../api/addition/projectInfo";
import './index.less'

export default class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      repo: [],
      repoType: "",
      username: '',
      password: '',
      _password: '',
    };
  }

  get passwordChanged() {
    return this.state._password !== this.state.password
  }

  cpPassword (password: string) {
    this.setState({ _password: password })
  }

  componentDidMount() {
    queryProjectInfo().then((res) => {
      this.setState({ ...res });
      this.cpPassword(res.password)
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

    const { id, projectName, repo, repoType, username } = request
    const password = this.passwordChanged ? request.password : undefined

    if (id) {
      updateProjectInfo({ id, projectName, repo, repoType, username, password })
        .then((res) => {
          if (res.success) {
            this.cpPassword(request.password)
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
      createProjectInfo({ projectName, repo, repoType, username, password })
        .then((res) => {
          if (res.success) {
            this.cpPassword(request.password)
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
      <div className="project-info">
        <div className="project-info-row">
          <div className="label">
            <span>项目名称</span>
          </div>
          <div className="content">
            <Input
              placeholder="项目名称"
              value={this.state.projectName}
              onChange={(e) => this.onChang("projectName", e.target.value)}
            ></Input>
          </div>
        </div>
        <div className="project-info-row">
          <div className="label">
            <span>仓库类型</span>
          </div>
          <div className="content">
            <Select
              placeholder="仓库类型"
              value={this.state.repoType}
              onChange={(value) => this.onChang("repoType", value)}
            >
              <Select.Option value={"GIT"}>GIT</Select.Option>
              <Select.Option value={"SVN"}>SVN</Select.Option>
            </Select>
          </div>
        </div>
        <div className="project-info-row">
          <div className="label">
            <span>仓库地址</span>
          </div>
          <div className="content">
            <Input
              placeholder="仓库地址"
              value={this.state.repo}
              onChange={(e) => this.onChang("repo", e.target.value)}
            ></Input>
          </div>
        </div>
        <div className="project-info-row">
          <div className="label">
            <span>用户名</span>
          </div>
          <div className="content">
            <Input
              placeholder="用户名"
              value={this.state.username}
              onChange={(e) => this.onChang("username", e.target.value)}
            ></Input>
          </div>
        </div>
        <div className="project-info-row">
          <div className="label">
            <span>密码</span>
          </div>
          <div className="content">
            <Input
              placeholder="密码"
              value={this.state.password}
              onChange={(e) => this.onChang("password", e.target.value)}
            ></Input>
          </div>
        </div>
        {/* <div className="project-info-row">
          <div className="label">
            <span>数据库表</span>
          </div>
          <div className="content">
          <TextArea
              placeholder="数据库表文件内容"
              value={this.state.sql}
              onChange={(e) => this.onChang("sql", e.target.value)}
            ></TextArea>
          </div>
        </div> */}
        <Button onClick={() => this.onSaveClick()} style={{ float: "right" }} type="primary">
          保存
        </Button>
      </div>
    );
  }
}
