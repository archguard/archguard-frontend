import './index.less'
import React, { useState, useRef, useEffect } from 'react'
import { Tabs, Row, Col, Modal, notification } from 'antd'
import { useMount } from 'react-use'
import { UpOutlined } from '@ant-design/icons'
import { scanDependence } from '@/api/scanner/dependenceScanner'
import { SystemInfo, createSystemInfo, updateSystemInfo } from '@/api/addition/systemInfo'
import { storage } from '@/store/storage/sessionStorage'
import useSystemList from '@/store/global-cache-state/useSystemList'
import SystemCard from './components/SystemCard'
import SystemInfoForm from './components/SystemInfoForm';

interface UserProfile {
  name?: string;
  account?: string;
}

const MultipleSystem = () => {
  const ref = useRef<any>({})
  const [user, setUser] = useState<UserProfile>()
  const [systemList, load] = useSystemList()
  const [systemInfoList, setSystemInfoList] = useState<SystemInfo[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [currentSystemInfo, setCurrentSystemInfo] = useState<SystemInfo>()

  useEffect(() => {
    setSystemInfoList(systemList?.value || [])
  }, [systemList])

  useMount(() => {
    storage.setSystemId(undefined)
    setUser({ name: '张扬', account: 'Zhang102' })
    load()
  })

  const routeToHome = (systemInfo: SystemInfo) => {
    if (systemInfo.scanned !== "SCANNED") return
    const { id } = systemInfo
    storage.setSystemId(id)
    window.location.href = `/${id}/analysis/dependence`
  }

  const onSubmitSystemInfo = (systemInfo: SystemInfo) => {
    if (systemInfo.id) {
      updateSystemInfo(systemInfo).then(() => {
        notification.success({
          type: 'success',
          message: '系统信息修改成功！'
        })
        onCancel()
        load()
      })
    } else {
      createSystemInfo(systemInfo).then(() => {
        notification.success({
          type: 'success',
          message: '系统创建成功！'
        })
        onCancel()
        load()
      })
    }
  }

  const onCreateClick = () => {
    setCurrentSystemInfo(undefined)
    setModalVisible(true)
  }

  const onEditClick = (systemInfo: SystemInfo) => {
    setCurrentSystemInfo({ ...systemInfo })
    setModalVisible(true)
  }

  const onSubmit = () => {
    ref.current.submit()
  }
  const onCancel = () => {
    setModalVisible(false)
    ref.current.clear()
  }

  const onScanning = (id: number) => {
    scanDependence(id).then(() => {
      load()
    })
  }

  return (
    <div className="multiple-system-container">
      <div className="multiple-system-header">
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
      <div className="multiple-system-selector">
        <Tabs defaultActiveKey="my-system">
          <Tabs.TabPane tab="我的系统" key="my-system">
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                <SystemCard
                  onClick={onCreateClick}></SystemCard>
              </Col>
              { systemInfoList.map((systemInfo) => (
                <Col xs={24} sm={12} md={8} lg={6} xxl={4} key={systemInfo.id}>
                  <SystemCard
                    systemInfo={systemInfo}
                    onClick={() => routeToHome(systemInfo)}
                    onScanning={() => onScanning(systemInfo.id)}
                    onEdit={() => onEditClick(systemInfo)}></SystemCard>
                </Col>
              ))}
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="其他系统" key="other-system" disabled>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <Modal
        centered
        maskClosable={false}
        visible={modalVisible}
        onCancel={onCancel}
        onOk={onSubmit}>
        <SystemInfoForm
          ref={ref}
          data={currentSystemInfo}
          onSubmit={onSubmitSystemInfo}></SystemInfoForm>
      </Modal>
    </div>
  )
}

export default MultipleSystem;
