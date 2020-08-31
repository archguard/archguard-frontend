import React from 'react'
import { Card, Button } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { PlusOutlined } from '@ant-design/icons'
import { ProjectInfo } from '@/api/addition/projectInfo'
import { scanDependence } from '@/api/scanner/dependenceScanner'

interface ProjectCardProps {
  projectInfo?: ProjectInfo;
  onClick?(): void;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { projectInfo, onClick } = props

  const renderProjectButton = (projectInfo: ProjectInfo) => {
    const { scanned } = projectInfo
    const scanning = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      return scanDependence() && event.stopPropagation()
    }

    if (scanned === 'NONE') {
      return (
        <Button type="primary" onClick={scanning}>扫描</Button>
      )
    } else if(scanned === 'SCANNING') {
      return (
        <Button type="primary" loading>扫描中</Button>
      )
    } else {
      return (
        <Button type="primary">进入</Button>
      )
    }
  }

  return (
    projectInfo ? (
      <Card
        hoverable
        className="multiple-project-card"
        onClick={onClick}>
        <div className="multiple-project-card-content">
          <img
            style={{ margin: '70px 0', width: '180px' }}
            src={require('@/assets/project-example.png')}
            alt="example" />
          <div className="card-btn">{ renderProjectButton(projectInfo) }</div>
        </div>
        <div className="multiple-project-card-title">
          <Meta
            title={projectInfo.projectName}
            description={projectInfo.repo[0]} />
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
