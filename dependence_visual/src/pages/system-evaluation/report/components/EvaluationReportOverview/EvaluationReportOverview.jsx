import React from "react";
import { Row, Col, Button } from "antd";
import { queryEvaluation } from "@/api/addition/evaluations";

import ReportGraph from "./components/ReportGraph";

export default class EvaluationReportOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      data: {},
    };
  }

  componentDidMount() {
    queryEvaluation(this.state.id).then((res) => {
      this.setState({ data: res });
    });
  }

  render() {
    const data = this.state.data;
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
              <ReportGraph data={data.dimensions} />
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
}
