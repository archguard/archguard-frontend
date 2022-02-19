import React, { useState, useRef } from "react";
import { Card, Input, Button, Modal } from "antd";
import ProfileCardContent from "./ProfileCardContent";
import "./ProfileCard.less";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Profile, ProfileConfig } from "../../QualityGateProfile";
import { Store } from "antd/lib/form/interface";

interface ProfileCardProps {
  addProfile?(profile: Profile): void;
  editProfile?(profile: Profile): void;
  deleteProfile?(id: number): void;
  isEmpty?: boolean;
  id?: number;
  name?: string;
  data?: ProfileConfig[];
  editing?: boolean;
}

const ProfileCard = (props: ProfileCardProps) => {
  const { id, data, addProfile, editProfile, deleteProfile } = props;
  const ref = useRef<any>({});
  const [isEmpty, setIsEmpty] = useState(props.isEmpty);
  const [editing, setEditing] = useState(props.editing);
  const [name, setName] = useState(props.name);

  const onCancel = () => {
    if (props.isEmpty) {
      setIsEmpty(true);
      setName(undefined);
    } else {
      setName(props.name);
    }
    setEditing(false);
  };

  const onDelete = () => {
    Modal.confirm({
      title: "提示",
      icon: <ExclamationCircleOutlined />,
      content: "是否确认删除？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => deleteProfile!(id!),
    });
  };

  const onSubmitClick = () => {
    ref.current.submit();
  };

  const submitData = (values: Store) => {
    const config: ProfileConfig[] = values.profileConfig.map((item: any) => {
      const { operator, value } = item;
      const [layer, quota] = item.layerQuota;

      return { layer, quota, operator, value: parseFloat(value) };
    });
    const profile: Profile = { id: id!, name: name!, config };
    if (addProfile) {
      addProfile(profile);
    }
    if (editProfile) {
      editProfile(profile);
    }
    onCancel();
  };

  const onEdit = () => {
    setEditing(true);
  };
  const onCreate = () => {
    setIsEmpty(false);
    onEdit();
  };

  const getTitle = () => {
    if (editing) {
      return (
        <Input
          type="text"
          value={name}
          placeholder="请输入组名"
          onChange={({ target: { value } }) => setName(value)}
        ></Input>
      );
    }
    return <span>{name}</span>;
  };

  const getExtraButton = () => {
    if (editing) {
      return (
        <div className="btn-group">
          <Button type="link" danger onClick={() => onCancel()}>
            取消
          </Button>
          <Button type="link" disabled={!name} onClick={() => onSubmitClick()}>
            保存
          </Button>
        </div>
      );
    }
    return (
      <div className="btn-group">
        <Button type="link" danger onClick={() => onDelete()}>
          删除
        </Button>
        <Button type="link" onClick={() => onEdit()}>
          编辑
        </Button>
      </div>
    );
  };

  return isEmpty ? (
    <Card className="profile-card empty" onClick={() => onCreate()}>
      <div>
        <PlusOutlined />
      </div>
    </Card>
  ) : (
    <Card className="profile-card" size="small" title={getTitle()} extra={getExtraButton()}>
      <ProfileCardContent
        ref={ref}
        editing={editing!}
        data={data}
        onFinish={submitData}
      ></ProfileCardContent>
    </Card>
  );
};

export default ProfileCard;
