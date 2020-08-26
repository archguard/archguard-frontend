import './index.less'
import React, { useState } from 'react'
import { useMount } from 'react-use'
import { Tabs, Row, Col } from 'antd'
import { history } from 'umi';
import { UpOutlined } from '@ant-design/icons'
import { queryProjectInfo, ProjectInfo } from '@/api/addition/projectInfo'
import ProjectCard from './components/ProjectCard'
import storage from '@/store/storage/sessionStorage'

interface MultipleProjectProps {}
interface UserProfile {
  name?: string;
  account?: string;
}

const MultipleProject = (props: MultipleProjectProps) => {
  const [user, setUser] = useState<UserProfile>()
  const [projectList, setProjectList] = useState<ProjectInfo[]>([])

  const routeToHome = (projectInfo: ProjectInfo) => {
    const { id } = projectInfo
    storage.setProjectId(id)
    history.push(`/${id}/home`)
  }

  useMount(() => {
    setUser({ name: '张扬', account: 'Zhang102' })
    queryProjectInfo().then(res => setProjectList(res))
  })

  return (
    <div className="multiple-project-container">
      <div className="multiple-project-header">
        <div className="header-logo">
          <img src={require('@/assets/Logo.png')} alt="logo"></img>
        </div>
        { user &&
          <div className="header-user">
            <img src={require('@/assets/user-profile.png')}></img>
            <span className="user-name">{user.name} / {user.account}</span>
            <UpOutlined className="user-icon" />
          </div>
        }
      </div>
      <div className="multiple-project-selector">
        <Tabs defaultActiveKey="my-project">
          <Tabs.TabPane tab="我的项目" key="my-project">
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                <ProjectCard></ProjectCard>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                { projectList.map((projectInfo) => (
                  <ProjectCard key={projectInfo.id} projectInfo={projectInfo} onClick={() => routeToHome(projectInfo)}></ProjectCard>
                ))}
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="其他项目" key="other-project" disabled>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default MultipleProject;
