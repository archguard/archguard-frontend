import React, { useState } from 'react'
import { useMount } from 'react-use'
import { UpOutlined } from '@ant-design/icons'

import './index.less'
import { Tabs } from 'antd'
import MultipleProjectCardList from './components/MultipleProjectCardList'

interface MultipleProjectProps {}
interface UserProfile {
  name?: string;
  account?: string;
}
const MultipleProject = (props: MultipleProjectProps) => {
  const [user, setUser] = useState<UserProfile>()

  useMount(() => {
    setUser({ name: '张扬', account: 'Zhang102' })
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
            <MultipleProjectCardList editable></MultipleProjectCardList>
          </Tabs.TabPane>
          <Tabs.TabPane tab="其他项目" key="other-project">
            <MultipleProjectCardList></MultipleProjectCardList>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default MultipleProject;
