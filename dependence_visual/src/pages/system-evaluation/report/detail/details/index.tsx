import React from "react";
import { mapToLabel } from "../../config";
import ArrayArea from "./array-area";
import NumberArea from "./number-area";

type ReportProperties = object;
type EvaluationReportDetailProps = {
  properties: ReportProperties;
};
type ReportPropertyKey = keyof ReportProperties;
export default function EvaluationReportDetail({ properties }: EvaluationReportDetailProps) {
  const keys: Array<ReportPropertyKey> = Object.keys(properties) as ReportPropertyKey[];
  const data = keys.map((key) => ({
    type: mapToLabel(key),
    data: properties[key],
  }));
  return (
    <div>
      <NumberArea data={data.filter((item) => !Array.isArray(item.data))} />
      <ArrayArea data={data.filter((item) => Array.isArray(item.data))} />
    </div>
  );
}
