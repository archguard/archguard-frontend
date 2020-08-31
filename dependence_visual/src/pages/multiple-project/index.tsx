import './index.less'
import React, { useState, useRef, useEffect } from 'react'
import { Tabs, Row, Col, Modal, notification } from 'antd'
import { useMount } from 'react-use'
import { UpOutlined } from '@ant-design/icons'
import { scanDependence } from '@/api/scanner/dependenceScanner'
import { ProjectInfo, createProjectInfo, updateProjectInfo } from '@/api/addition/projectInfo'
import { storage } from '@/store/storage/sessionStorage'
import useProjectList from '@/store/global-cache-state/useProjectList'
import ProjectCard from './components/ProjectCard'
import ProjectInfoForm from './components/ProjectInfoForm';

interface UserProfile {
  name?: string;
  account?: string;
}

const MultipleProject = () => {
  const ref = useRef<any>({})
  const [user, setUser] = useState<UserProfile>()
  const [projectList, load] = useProjectList()
  const [projectInfoList, setProjectInfoList] = useState<ProjectInfo[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [currentProjectInfo, setCurrentProjectInfo] = useState<ProjectInfo>()

  useEffect(() => {
    setProjectInfoList(projectList?.value || [])
  }, [projectList])

  useMount(() => {
    storage.setProjectId(undefined)
    setUser({ name: '张扬', account: 'Zhang102' })
    load()
  })

  const routeToHome = (projectInfo: ProjectInfo) => {
    if (projectInfo.scanned !== "SCANNED") return
    const { id } = projectInfo
    storage.setProjectId(id)
    window.location.href = `/${id}/analysis/dependence`
  }

  const onSubmitProjectInfo = (projectInfo: ProjectInfo) => {
    console.log(projectInfo)
    // if (projectInfo.id) {
    //   updateProjectInfo(projectInfo).then(() => {
    //     notification.success({
    //       type: 'success',
    //       message: '系统信息修改成功！'
    //     })
    //     onCancel()
    //     load()
    //   })
    // } else {
    //   createProjectInfo(projectInfo).then(() => {
    //     notification.success({
    //       type: 'success',
    //       message: '系统创建成功！'
    //     })
    //     onCancel()
    //     load()
    //   })
    // }
  }

  const onCreateClick = () => {
    setCurrentProjectInfo(undefined)
    setModalVisible(true)
  }

  const onEditClick = (projectInfo: ProjectInfo) => {
    setCurrentProjectInfo({ ...projectInfo })
    setModalVisible(true)
  }

  const onSubmit = () => {
    ref.current.submit()
  }
  const onCancel = () => {
    setModalVisible(false)
    ref.current.clear()
  }

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
                  onClick={onCreateClick}></ProjectCard>
              </Col>
              { projectInfoList.map((projectInfo) => (
                <Col xs={24} sm={12} md={8} lg={6} xxl={4} key={projectInfo.id}>
                  <ProjectCard
                    projectInfo={projectInfo}
                    onClick={() => routeToHome(projectInfo)}
                    onScanning={() => scanDependence(projectInfo.id)}
                    onEdit={() => onEditClick(projectInfo)}></ProjectCard>
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
        <ProjectInfoForm
          ref={ref}
          data={currentProjectInfo}
          onSubmit={onSubmitProjectInfo}></ProjectInfoForm>
      </Modal>
    </div>
  )
}

export default MultipleProject;
