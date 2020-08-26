import React from 'react'
import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { PlusOutlined } from '@ant-design/icons'
import { ProjectInfo } from '@/api/addition/projectInfo'

interface ProjectCardProps {
  projectInfo?: ProjectInfo;
  onClick?(): void;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { projectInfo, onClick } = props

  return (
    projectInfo ? (
      <Card hoverable onClick={onClick}>
        <div className="multiple-project-card-content">
          <img
            style={{ margin: '70px 0', width: '180px' }}
            src={require('@/assets/project-example.png')}
            alt="example" />
        </div>
        <Meta title={projectInfo.projectName} description={projectInfo.projectName} />
      </Card>
    ) : (
      <Card hoverable onClick={onClick}>
        <div className="multiple-project-card-content add">
          <PlusOutlined />
        </div>
        <div className="multiple-project-card-title">
          <span>新增项目</span>
        </div>
      </Card>
    )
  )
}

export default ProjectCard
