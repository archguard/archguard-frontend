import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { queryEvaluation } from "@/api/addition/evaluations";

import ReportGraph, { Dimension } from "./components/ReportGraph";

type EvaluationReportOverviewProps = {
  id: string;
};
interface EvaluationReportOverviewState {
  name: string;
  createdDate: string;
  comment: string;
  dimensions: Dimension[];
  improvements: string[];
}
export default function EvaluationReportOverview({ id }: EvaluationReportOverviewProps) {
  const [data, setData] = useState<EvaluationReportOverviewState>(
    {} as EvaluationReportOverviewState,
  );
  useEffect(() => {
    queryEvaluation<EvaluationReportOverviewState>(id).then((res) => {
      setData((res as unknown) as EvaluationReportOverviewState);
    });
  }, [id]);

  return (
    <div>
      <Row align="middle">
        <Col span={4}>
          <h2>{data.name}</h2>
        </Col>
        <Col span={16}>
          <p>{data.createdDate}</p>
        </Col>
      </Row>
      <div
        style={{
          backgroundColor: "rgba(176,180,180,0.09)",
          padding: "32px",
        }}
      >
        <Row>
          <Col span={8}>
            <ReportGraph dimensions={data.dimensions} />
          </Col>
          <Col span={16}>
            <p>{data.comment}</p>
            <h3>重点提升点：</h3>
            <ul>
              {data.improvements &&
                data.improvements.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}
