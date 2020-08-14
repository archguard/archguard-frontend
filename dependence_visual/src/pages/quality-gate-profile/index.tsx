import React, { useState } from 'react'
import ProfileCard from './profile-card';
import { Row, Col, notification } from 'antd';
import { useAsync, useMount } from 'react-use';
import { queryAllQualityGateProfile, createQualityGateProfile, updateQualityGateProfile, deleteQualityGateProfile } from '@/api/module/profile';
import { LayerKeys } from '../analysis/dependence/ModuleDependence/components/ModuleCouplingTree/report';
import * as _ from 'lodash'

export interface ProfileConfig {
  layer: LayerKeys;
  quota: string;
  operator: "BIGGER" | "LESS" | "EQUAL";
  value: number;
}

export interface Profile {
  id?: number;
  name: string;
  config: ProfileConfig[];
}

const QualityGateProfile = () => {
  const [profileList, setProfileList] = useState<Profile[]>([])

  const load = () => {
    queryAllQualityGateProfile().then((res) => {
      setProfileList(res)
    })
  }
  useMount(() => { load() })

  const addProfile = (profile: Profile) => {
    setProfileList([...profileList, profile])
    createQualityGateProfile(profile).then(() => {
      notification.success({
        message: '新增成功！'
      })
      load()
    })
  }

  const editPropfile = (profile: Profile) => {
    const index = _.findIndex(profileList, ['id', profile.id])
    profileList[index] = profile
    setProfileList([...profileList])
    updateQualityGateProfile(profile.id!, profile).then(() => {
      notification.success({
        message: '更新成功！'
      })
    })
  }

  const deleteProfile = (id: number) => {
    deleteQualityGateProfile(id).then(() => {
      notification.success({
        message: '删除成功！'
      })
      load()
    })
  }

  return (
    <Row gutter={24}>
      {profileList.map((profile: Profile, index: number) => (
        <Col xs={24} lg={12} xxl={8} key={profile.name}>
          <ProfileCard
            id={profile.id}
            data={profile.config}
            name={profile.name}
            editProfile={editPropfile}
            deleteProfile={deleteProfile}></ProfileCard>
        </Col>
      ))}
      <Col xs={24} lg={12} xxl={8} key="empty-profile">
        <ProfileCard isEmpty addProfile={addProfile}></ProfileCard>
      </Col>
    </Row>
  )
};

export default QualityGateProfile;
