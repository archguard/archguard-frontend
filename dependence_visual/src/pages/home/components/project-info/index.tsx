import { createProjectInfo, queryProjectInfo, updateProjectInfo } from "@/api/addition/projectInfo";
import { useMount } from "ahooks";
import { Button, Input, notification } from "antd";
import Select from "antd/es/select";
import React, { useState } from "react";
import "./index.less";

export default function ProjectInfo() {
  const [id, setId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [repo, setRepo] = useState("");
  const [repoType, setRepoType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const passwordChanged = oldPassword !== password;

  const load = async () => {
    const { id, repo, repoType, username, password, projectName } = await queryProjectInfo();
    setId(id);
    setPassword(password);
    setOldPassword(password);
    setRepo(repo);
    setRepoType(repoType);
    setUsername(username);
    setProjectName(projectName);
  };

  useMount(load);

  const onSaveClick = async () => {
    const params = {
      id,
      projectName,
      repo: !Array.isArray(repo) ? repo.split(",") : repo,
      repoType,
      username,
      password: passwordChanged ? password : undefined,
    };
    if (id) {
      await updateProjectInfo(params).then((res) => {
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
      await createProjectInfo(params).then((res) => {
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
    }
    await load();
  };

  return (
    <div className="project-info">
      <div className="project-info-row">
        <div className="label">
          <span>项目名称</span>
        </div>
        <div className="content">
          <Input
            placeholder="项目名称"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          ></Input>
        </div>
      </div>
      <div className="project-info-row">
        <div className="label">
          <span>仓库类型</span>
        </div>
        <div className="content">
          <Select placeholder="仓库类型" value={repoType} onChange={setRepoType}>
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
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>
      </div>
      <Button onClick={onSaveClick} style={{ float: "right" }} type="primary">
        保存
      </Button>
    </div>
  );
}
