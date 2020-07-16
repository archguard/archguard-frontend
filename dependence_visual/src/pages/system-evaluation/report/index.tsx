import React from "react";
import { Button } from "antd";

import queryString from "query-string";
import EvaluationReportOverview from "./components/EvaluationReportOverview";
import EvaluationReportDetails from "./components/EvaluationReportDetails";

// import "mock/evaluationReport";

// TODO 使用hooks重构，使用useParams获取URL参数
export default class EvaluationReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: queryString.parse(this.props.location.search).id,
      showDetail: false,
    };
  }

  render() {
    const id = this.state.id;
    const showDetail = this.state.showDetail;

    return (
      <div>
        <div>
          <p style={{ cursor: "pointer" }} onClick={() => this.props.history.goBack()}>
            {"<<返回"}
          </p>
        </div>

        <Button
          type="primary"
          style={{ float: "right" }}
          onClick={() => this.setState({ showDetail: !showDetail })}
        >
          {showDetail ? "收起详情" : "查看详情"}
        </Button>

        <EvaluationReportOverview id={id} />

        <div
          style={{
            display: showDetail ? undefined : "none",
            marginTop: "32px",
          }}
        >
          <EvaluationReportDetails id={id} />
        </div>
      </div>
    );
  }
}
