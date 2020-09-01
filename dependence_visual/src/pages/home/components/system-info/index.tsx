import React, { useState } from "react";
import { Button, Input, notification, Space, Select } from "antd";
import { useMount } from "ahooks";
import "./index.less";
import { createSystemInfo, querySystemInfo, updateSystemInfo } from "@/api/addition/systemInfo";
import { storage } from '@/store/storage/sessionStorage'
import * as _ from 'lodash'

interface SystemInfoProps {
  isEditing: boolean;
  onEditChange(isEditing: boolean): void;
}

export default function SystemInfo(props: SystemInfoProps) {
  const { isEditing, onEditChange } = props;
  const [id, setId] = useState("");
  const [systemName, setSystemName] = useState("");
  const [repo, setRepo] = useState("");
  const [repoType, setRepoType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [originalSystemInfo, setOriginalSystemInfo] = useState<any>();

  const passwordChanged = oldPassword !== password;

  const load = async () => {
    const systemInfo = await querySystemInfo();
    const systemId = storage.getSystemId()
    const currentSystemInfo = _.find(systemInfo, ['id', Number(systemId)])
    const { id, repo, repoType, username, password, systemName } = currentSystemInfo!
    setOriginalSystemInfo({ id, repo, repoType, username, password, systemName })
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
      await updateSystemInfo(params).then((res) => {
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
      await createSystemInfo(params).then((res) => {
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
    const { id, repo, repoType, username, password, systemName } = originalSystemInfo
    setId(id);
    setPassword(password);
    setOldPassword(password);
    setRepo(repo);
    setRepoType(repoType);
    setUsername(username);
    setSystemName(systemName);
  };

  const renderReadonlySystemInfo = () => {
    return (
      <div className="system-info">
        <div className="system-info-row">
          <div className="label">
            <span>系统名称</span>
          </div>
          <div className="content">
            <span>{systemName}</span>
          </div>
        </div>
        <div className="system-info-row">
          <div className="label">
            <span>仓库类型</span>
          </div>
          <div className="content">
            <span>{repoType}</span>
          </div>
        </div>
        <div className="system-info-row">
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

  const renderEditableSystemInfo = () => {
    return (
      <div className="system-info">
        <div className="system-info-row">
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
        <div className="system-info-row">
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
        <div className="system-info-row">
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
        <div className="system-info-row">
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
        <div className="system-info-row">
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

  return isEditing ? renderEditableSystemInfo() : renderReadonlySystemInfo();
}
