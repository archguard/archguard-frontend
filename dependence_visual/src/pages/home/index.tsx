import React, { useState } from "react";
import SystemInfo from "./components/system-info";
import { FEATURES, getFeature } from "@/config/buildTargets";
import "./index.less";
import DependenceScanner from './components/DependenceScanner';
import { EditOutlined } from '@ant-design/icons';

export default function Home() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="home-page">
      <div>
        <h2>
          <span>系统信息</span>
          <span className="edit-icon"><EditOutlined onClick={() => setIsEditing(true)}  /></span>
        </h2>
        <SystemInfo isEditing={isEditing} onEditChange={(isEditing) => setIsEditing(isEditing)} />
      </div>
      <div>
        <h2>系统扫描</h2>
        {getFeature(FEATURES.CODE_SCANNER) && <DependenceScanner />}
      </div>
    </div>
  );
}
