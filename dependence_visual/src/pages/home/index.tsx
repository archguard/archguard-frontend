import React from "react";
import ProjectInfo from "./components/project-info";
import ProjectOverView from "./components/project-overview";
import "./index.less";

export default function Home() {
  return (
    <div className="home-page">
      <div>
        <h2>项目信息</h2>
        <ProjectInfo />
      </div>
      <div>
        <h2>项目概览</h2>
        <ProjectOverView />
      </div>
    </div>
  );
}
