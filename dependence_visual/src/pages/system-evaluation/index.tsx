import { Col, Row } from "antd";
import React from "react";
import EvaluationContent from "./components/evaluation-content";
import HistoryReport from "./components/history-report";

export default function SystemEvaluation() {
  return (
    <Row gutter={32}>
      <Col span={18}>
        <EvaluationContent />
      </Col>
      <Col span={6}>
        <HistoryReport />
      </Col>
    </Row>
  );
}
