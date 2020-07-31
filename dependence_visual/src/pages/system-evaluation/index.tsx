import { Col, Row, Drawer } from "antd";
import React, { useState } from "react";
import EvaluationContent from "./components/evaluation-content";
import HistoryReport from "./components/history-report";
import { SettingFilled } from "@ant-design/icons";
import ScanToolsConfig from './components/project-scan';

export default function SystemEvaluation() {
  const [configVisible, setConfigVisible] = useState(false);

  return (
    <div>
      <SettingFilled onClick={() => setConfigVisible(true)} style={{float: "right"}}/>
      <Row gutter={32}>
        <Col span={18}>
          <EvaluationContent />
        </Col>
        <Col span={6}>
          <HistoryReport />
        </Col>
      </Row>
      <Drawer title="配置" placement="right" width="60%" visible={configVisible} onClose={() => setConfigVisible(false)}>
        <ScanToolsConfig />
      </Drawer>
    </div>
  );
}
