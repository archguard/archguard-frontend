import React from 'react'
import { Card, Button, Dropdown, Menu } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons'
import { ProjectInfo } from '@/api/addition/projectInfo'
import { useMount } from 'ahooks'

interface ProjectCardProps {
  projectInfo?: ProjectInfo;
  onClick?(): void;
  onEdit?(): void;
  onScanning?(): void;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { projectInfo, onClick, onEdit, onScanning } = props

  const menuClick = (key: string) => {
    switch (key) {
      case 'reScanning': onScanning!();
        break;
      case 'editProjectInfo': onEdit!();
        break;
    }
  }

  const menu = (
    <Menu onClick={({ key }) => menuClick(key as string)}>
      <Menu.Item key="reScanning">重新扫描</Menu.Item>
      <Menu.Item key="editProjectInfo">修改项目信息</Menu.Item>
    </Menu>
  );

  const renderProjectButton = (projectInfo: ProjectInfo) => {
    const { scanned } = projectInfo
    const onScannedClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onScanning!()
      return event.stopPropagation()
    }

    return scanned === 'NONE' ? (<Button type="primary" onClick={onScannedClick}>扫描</Button>) :
           scanned === 'SCANNING' ? (<Button type="primary" loading>扫描中</Button>) :
          (<Button type="primary" onClick={onClick}>进入</Button>);
  }

  return (
    projectInfo ? (
      <Card
        hoverable
        className="multiple-project-card">
        <div className="multiple-project-card-content">
          <Dropdown overlay={menu} placement="bottomLeft" className="more" trigger={['click']}>
            <Button size="small" shape="circle" icon={<EllipsisOutlined />}></Button>
          </Dropdown>
          <img
            style={{ margin: '30px 0', width: '180px' }}
            src={require('@/assets/project-example.png')}
            alt="example" />
          <div className="card-btn">{ renderProjectButton(projectInfo) }</div>
        </div>
        <div className="multiple-project-card-title">
          <Meta
            title={projectInfo.projectName}
            description={projectInfo.repo.join(', ')} />
        </div>
      </Card>
    ) : (
      <Card
        hoverable
        className="multiple-project-card"
        onClick={onClick}>
        <div className="multiple-project-card-content add">
          <PlusOutlined />
        </div>
        <div className="multiple-project-card-title add">
          <span>新增系统</span>
        </div>
      </Card>
    )
  )
}

export default ProjectCard
