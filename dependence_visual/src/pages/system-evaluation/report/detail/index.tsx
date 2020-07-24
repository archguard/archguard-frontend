import { queryEvaluationDetails } from "@/api/addition/evaluations";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { EvaludationKeys, mapToLabel } from "../config";
import EvaluationReportDetail from "./details";

type EvaluationReportDetailsProps = { id: string };
type EvaludationData = {
  [key in EvaludationKeys]: object | null;
};
export default function EvaluationReportDetails({ id }: EvaluationReportDetailsProps) {
  const [data, setData] = useState<EvaludationData>({} as EvaludationData);
  const keys: Array<EvaludationKeys> = Object.keys(data) as EvaludationKeys[];
  useEffect(() => {
    queryEvaluationDetails<EvaludationData>(id).then((res) => {
      setData(res);
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
          return data[key] ? (
            <Tabs.TabPane tab={mapToLabel(key)} key={key}>
              <EvaluationReportDetail properties={data[key]!} />
            </Tabs.TabPane>
          ) : null;
        })}
      </Tabs>
    </div>
  );
}
