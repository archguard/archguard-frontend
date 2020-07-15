import React from "react";
import { Row, Col } from "antd";

import EvaluationContent from "./components/EvaluationContent";
import HistoryReport from "./components/HistoryReport";

export default class SystemEvaluation extends React.Component {
  render() {
    return (
      <div>
        <Row gutter={32}>
          <Col span={18}>
            <EvaluationContent />
          </Col>
          <Col span={6}>
            <HistoryReport/>
          </Col>
        </Row>
      </div>
    );
  }
}
