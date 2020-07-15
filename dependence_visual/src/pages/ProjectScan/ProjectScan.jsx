import React from "react";
import ScannerConfig from "./components/ScannerConfig";
import "./ProjectScan.css";

export default function ProjectScan() {
  return (
    <div className="project-scan">
      <div>
        <h2>扫描配置</h2>
        <ScannerConfig />
      </div>
    </div>
  );
}
