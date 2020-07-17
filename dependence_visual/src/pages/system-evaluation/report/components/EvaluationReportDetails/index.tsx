import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import EvaluationReportDetail from "./components/EvaluationReportDetail";

import { queryEvaluationDetails } from "@/api/addition/evaluations";

import { mapToLabel, EvaludationKeys } from "../../config";
type EvaluationReportDetailsProps = { id: string };
type EvaludationData = {
  [key in EvaludationKeys]: object | null;
};
export default function EvaluationReportDetails({ id }: EvaluationReportDetailsProps) {
  const [data, setData] = useState<EvaludationData>({} as EvaludationData);
  const keys: Array<EvaludationKeys> = Object.keys(data) as EvaludationKeys[];
  useEffect(() => {
    queryEvaluationDetails(id).then((res) => {
      setData((res as unknown) as EvaludationData);
    });
  }, [id]);
  return (
    <div
      style={{
        backgroundColor: "rgba(176,180,180,0.09)",
        padding: "32px",
      }}
    >
      <Tabs>
        {keys.map((key) => {
          if (data[key]) {
            return (
              <Tabs.TabPane tab={mapToLabel(key)} key={key}>
                <EvaluationReportDetail properties={data[key]!} />
              </Tabs.TabPane>
            );
          }
        })}
      </Tabs>
    </div>
  );
}
