import React, { useState } from "react";
import { Button, Select } from "antd";
import { QuestionCircleOutlined, LoginOutlined } from "@ant-design/icons";
import { FEATURES, getFeature } from "@/config/buildTargets";
import useProjectList from '@/store/global-cache-state/useProjectList';
import { storage } from '@/store/storage/sessionStorage';

export default function PageHeader(props: any) {
  const [projectInfo] = useProjectList()
  const currentProjectId = Number(storage.getProjectId())

  const onProjectChange = (projectId: number) => {
    if (projectId) {
      storage.setProjectId(projectId)
      const pathArray = window.location.pathname.split('/')
      pathArray[1] = projectId.toString()
      window.location.href = pathArray.join('/')
    } else {
      props.history.push('/multiple-project')
    }
  }

  return (
    <div>
      <div style={{ float: 'left' }}>
        <span
          style={{
            marginLeft: "24px",
            color: "#ffffff",
            fontStyle: "italic",
            fontSize: "20px",
            fontWeight: 800,
          }}
        >
          ArchGuard
        </span>
        <span style={{ marginLeft: 15, color: 'white', userSelect: 'none' }}>丨</span>
        <Select
          defaultValue={currentProjectId!}
          style={{ width: 150, color: '#fff' }}
          bordered={false}
          showArrow={false}
          onChange={value => onProjectChange(value)}>
          <Select.OptGroup label="点击切换系统">
            { projectInfo?.value!.map(project => (
              <Select.Option
                disabled={project.scanned !== "SCANNED"}
                value={project.id}
                key={project.projectName}>
                { project.projectName }
              </Select.Option>
            )) }
          </Select.OptGroup>
          <Select.OptGroup label="点击返回">
            <Select.Option value={0} key={0}>返回选择页面</Select.Option>
          </Select.OptGroup>
        </Select>
      </div>
      <div style={{ display: "inline-block", float: "right" }}>
        {getFeature(FEATURES.INSIDE_FEATURE) && (
          <Button
            type="link"
            style={{color: "#ffffff"}}
            icon={<QuestionCircleOutlined />}
            onClick={() => props.history.push(`/${currentProjectId}/help`)}
          >说明文档</Button>
        )}
        <Button
            type="link"
            style={{color: "#ffffff"}}
            icon={<LoginOutlined />}
            onClick={() => props.history.push("/login")}
          >登陆</Button>
      </div>
    </div>
  );
}
