import React from "react";
import ProjectInfo from "./components/project-info";
import { FEATURES, getFeature } from "@/config/buildTargets";
import "./index.less";
import DependenceScanner from './components/DependenceScanner';

export default function Home() {
  return (
    <div className="home-page">
      <div>
        <h2>项目信息</h2>
        <ProjectInfo />
      </div>
      <div>
        <h2>项目扫描</h2>
        {getFeature(FEATURES.CODE_SCANNER) && <DependenceScanner />}
      </div>
    </div>
  );
}
