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
        { !projectInfo.scanned ?
          <Button
            type="primary"
            className="card-btn">进入</Button> :
          <Button
            type="primary"
            className="card-btn"
            onClick={(e) => scanDependence() && e.stopPropagation()}>扫描</Button>
        }
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
          <span>新增项目</span>
        </div>
      </Card>
    )
  )
}

export default ProjectCard
