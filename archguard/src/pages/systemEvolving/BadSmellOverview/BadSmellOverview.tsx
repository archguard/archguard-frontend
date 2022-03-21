import QualityEvaluation from "@/pages/systemSummary/Summary/components/QualityEvaluation";
import React from "react";
import { useOverview } from "@/api/module/codeLine";

const BadSmellOverview = () => {
  const { data: overViewData } = useOverview();

  return <div className="chart">
    <QualityEvaluation data={overViewData} name="坏味道分布雷达"/>
  </div>
}

export default BadSmellOverview;
