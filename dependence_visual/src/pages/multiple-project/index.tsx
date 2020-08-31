import './index.less'
import React, { useState, useRef, useEffect } from 'react'
import { useMount } from 'react-use'
import { Tabs, Row, Col, Modal, notification } from 'antd'
import { UpOutlined } from '@ant-design/icons'
import { ProjectInfo, createProjectInfo } from '@/api/addition/projectInfo'
import ProjectCard from './components/ProjectCard'
import { storage } from '@/store/storage/sessionStorage'
import ProjectInfoForm from './components/ProjectInfoForm';
import { Store } from 'antd/lib/form/interface';
import useProjectInfo from '@/store/global-cache-state/useProjectInfo'

interface UserProfile {
  name?: string;
  account?: string;
}

const MultipleProject = () => {
  const [user, setUser] = useState<UserProfile>()
  const [projectList, setProjectList] = useState<ProjectInfo[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const ref = useRef<any>({})
  const [projectInfo, load] = useProjectInfo()

  const routeToHome = (projectInfo: ProjectInfo) => {
    if (projectInfo.scanned !== "SCANNED") return
    const { id } = projectInfo
    storage.setProjectId(id)
    window.location.href = `/${id}/analysis/dependence`
  }

  const createProject = (values: Store) => {
    createProjectInfo(values).then(() => {
      notification.success({
        type: 'success',
        message: '系统创建成功！'
      })
      onCancel()
      load()
    })
  }

  const onSubmit = () => {
    ref.current.submit()
  }
  const onCancel = () => {
    setModalVisible(false)
    ref.current.clear()
  }

  useEffect(() => {
    setProjectList(projectInfo?.value || [])
  }, [projectInfo])

  useMount(() => {
    setUser({ name: '张扬', account: 'Zhang102' })
    load()
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
          <Tabs.TabPane tab="我的系统" key="my-project">
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                <ProjectCard
                  onClick={() => setModalVisible(true)}></ProjectCard>
              </Col>
              { projectList.map((projectInfo) => (
                <Col xs={24} sm={12} md={8} lg={6} xxl={4} key={projectInfo.id}>
                  <ProjectCard projectInfo={projectInfo} onClick={() => routeToHome(projectInfo)}></ProjectCard>
                </Col>
              ))}
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="其他系统" key="other-project" disabled>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <Modal
        centered
        maskClosable={false}
        visible={modalVisible}
        onCancel={onCancel}
        onOk={onSubmit}>
        <ProjectInfoForm ref={ref} onFinish={createProject}></ProjectInfoForm>
      </Modal>
    </div>
  )
}

export default MultipleProject;
