import React from "react";
import { useBoolean } from "ahooks"
import { useHistory, useParams } from 'react-router-dom'
import { Button } from "antd";

import EvaluationReportOverview from "./components/EvaluationReportOverview";
import EvaluationReportDetails from "./components/EvaluationReportDetails";

// import "mock/evaluationReport";

export default function EvaluationReport(){
  const [showDetail, { toggle: toggleShowDetail }] = useBoolean(false)
  const { id: reportId } = useParams()
  const history = useHistory()
  return (
    <div>
      <div>
        <p style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
          {"<<返回"}
        </p>
      </div>

      <Button
        type="primary"
        style={{ float: "right" }}
        onClick={() => toggleShowDetail()}
      >
        {showDetail ? "收起详情" : "查看详情"}
      </Button>

      <EvaluationReportOverview id={reportId} />

      <div
        style={{
          display: showDetail ? undefined : "none",
          marginTop: "32px",
        }}
      >
        <EvaluationReportDetails id={reportId} />
      </div>
    </div>
  );
}
