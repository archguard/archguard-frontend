import React, { useState } from "react";
import ProjectInfo from "./components/project-info";
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
          <span>项目信息</span>
          <span className="edit-icon"><EditOutlined onClick={() => setIsEditing(true)}  /></span>
        </h2>
        <ProjectInfo isEditing={isEditing} onEditChange={(isEditing) => setIsEditing(isEditing)} />
      </div>
      <div>
        <h2>项目扫描</h2>
        {getFeature(FEATURES.CODE_SCANNER) && <DependenceScanner />}
      </div>
    </div>
  );
}
