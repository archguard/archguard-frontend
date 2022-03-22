import React, { useEffect, useState } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import { Col, notification, Row } from "antd";
import { createQualityGateProfile, deleteQualityGateProfile, updateQualityGateProfile, } from "@/api/module/profile";
import * as _ from "lodash";
import useQualityGate from "@/store/global-cache-state/useQualityGate";
import { Profile } from "@/types/metrics/Metrics";

const QualityGateProfile = () => {
  const [profileList, setProfileList] = useState<Profile[]>([]);
  const [qualityGate, load] = useQualityGate();
  useEffect(() => {
    setProfileList(qualityGate?.value);
  });

  const addProfile = (profile: Profile) => {
    setProfileList([...profileList, profile]);
    createQualityGateProfile(profile).then(() => {
      notification.success({
        message: "新增成功！",
      });
      load();
    });
  };

  const editProfile = (profile: Profile) => {
    const index = _.findIndex(profileList, ["id", profile.id]);
    profileList[index] = profile;
    setProfileList([...profileList]);
    updateQualityGateProfile(profile.id!, profile).then(() => {
      notification.success({
        message: "更新成功！",
      });
    });
  };

  const deleteProfile = (id: number) => {
    deleteQualityGateProfile(id).then(() => {
      notification.success({
        message: "删除成功！",
      });
      load();
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        质量阈设置：当数据不满足添加的规则时，将其视为不符合质量阈要求的数据
      </div>
      <Row gutter={24}>
        {profileList.map((profile: Profile, index: number) => (
          <Col xs={24} lg={12} xxl={8} key={profile.name}>
            <ProfileCard
              id={profile.id}
              data={profile.config}
              name={profile.name}
              editProfile={editProfile}
              deleteProfile={deleteProfile}
            ></ProfileCard>
          </Col>
        ))}
        <Col xs={24} lg={12} xxl={8} key="empty-profile">
          <ProfileCard isEmpty addProfile={addProfile}></ProfileCard>
        </Col>
      </Row>
    </div>
  );
};

export default QualityGateProfile;
