import React, { useState } from "react";
import { Button, Input, notification, Space, Select } from "antd";
import { useMount } from "ahooks";
import "./index.less";
import { createProjectInfo, queryProjectInfo, updateProjectInfo } from "@/api/addition/projectInfo";
import { storage } from '@/store/storage/sessionStorage'
import * as _ from 'lodash'

interface ProjectInfoProps {
  isEditing: boolean;
  onEditChange(isEditing: boolean): void;
}

export default function ProjectInfo(props: ProjectInfoProps) {
  const { isEditing, onEditChange } = props;
  const [id, setId] = useState("");
  const [systemName, setSystemName] = useState("");
  const [repo, setRepo] = useState("");
  const [repoType, setRepoType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [originalProjectInfo, setOriginalProjectInfo] = useState<any>();

  const passwordChanged = oldPassword !== password;

  const load = async () => {
    const projectInfo = await queryProjectInfo();
    const projectId = storage.getProjectId()
    const currentProjectInfo = _.find(projectInfo, ['id', Number(projectId)])
    const { id, repo, repoType, username, password, systemName } = currentProjectInfo!
    setOriginalProjectInfo({ id, repo, repoType, username, password, systemName })
    setId(id);
    setPassword(password);
    setOldPassword(password);
    setRepo(repo);
    setRepoType(repoType);
    setUsername(username);
    setSystemName(systemName);
  };

  useMount(load);

  const onSaveClick = async () => {
    const params = {
      id,
      systemName,
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
          onEditChange(false);
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
          onEditChange(false);
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    }
    await load();
  };

  const onCancelClick = () => {
    onEditChange(false);
    const { id, repo, repoType, username, password, systemName } = originalProjectInfo
    setId(id);
    setPassword(password);
    setOldPassword(password);
    setRepo(repo);
    setRepoType(repoType);
    setUsername(username);
    setSystemName(systemName);
  };

  const renderReadonlyProjectInfo = () => {
    return (
      <div className="project-info">
        <div className="project-info-row">
          <div className="label">
            <span>系统名称</span>
          </div>
          <div className="content">
            <span>{systemName}</span>
          </div>
        </div>
        <div className="project-info-row">
          <div className="label">
            <span>仓库类型</span>
          </div>
          <div className="content">
            <span>{repoType}</span>
          </div>
        </div>
        <div className="project-info-row">
          <div className="label">
            <span>仓库地址</span>
          </div>
          <div className="content">
            <span>{repo}</span>
          </div>
        </div>
      </div>
    )
  }

  const renderEditableProjectInfo = () => {
    return (
      <div className="project-info">
        <div className="project-info-row">
          <div className="label">
            <span>系统名称</span>
          </div>
          <div className="content">
            <Input
              placeholder="系统名称"
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
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
        <div style={{ float: "right" }}>
          <Space>
            <Button onClick={onCancelClick}>取消</Button>
            <Button onClick={onSaveClick} type="primary">保存</Button>
          </Space>
        </div>
      </div>
    );
  }

  return isEditing ? renderEditableProjectInfo() : renderReadonlyProjectInfo();
}
