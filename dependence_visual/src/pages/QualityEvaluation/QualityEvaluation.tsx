import React from "react";
import { Chart, Tooltip, Interval, Coordinate, Interaction } from "bizcharts";

enum Category {
  体量过大 = "体量过大",
  设计冗余 = "设计冗余",
  过高耦合 = "过高耦合",
  过低内聚 = "过低内聚",
  过于复杂 = "过于复杂",
  缺乏分层 = "缺乏分层",
}

const COLOR_MAP: Record<Category, string> = {
  体量过大: "#ee8572",
  设计冗余: "#3aafae",
  过高耦合: "#4d64b5",
  过低内聚: "#c06c9f",
  过于复杂: "#d98e37",
  缺乏分层: "#546b66",
};

const data = [
  { badSmell: "体量过大-类较大", category: "体量过大", count: 20 },
  { badSmell: "体量过大-类较大2", category: "体量过大", count: 10 },
  { badSmell: "体量过大-类较大3", category: "体量过大", count: 10 },
  { badSmell: "设计冗余1", category: "设计冗余", count: 28.8 },
  { badSmell: "过高耦合1", category: "过高耦合", count: 39.3 },
  { badSmell: "过低内聚1", category: "过低内聚", count: 21.4 },
  { badSmell: "过于复杂1", category: "过于复杂", count: 47 },
  { badSmell: "缺乏分层1", category: "缺乏分层", count: 20.3 },
  { badSmell: "体量过大2", category: "体量过大", count: 10 },
  { badSmell: "设计冗余2", category: "设计冗余", count: 23.2 },
  { badSmell: "过高耦合2", category: "过高耦合", count: 34.5 },
  { badSmell: "过低内聚2", category: "过低内聚", count: 19.7 },
  { badSmell: "过于复杂2", category: "过于复杂", count: 22.6 },
  { badSmell: "缺乏分层2", category: "缺乏分层", count: 35.5 },
];

function getColor(category: Category): string {
  return COLOR_MAP[category] || "red";
}

function QualityEvaluation() {
  return (
    <Chart height={400} padding="auto" data={data} autoFit>
      <Interval
        adjust={[
          {
            type: "dodge",
            marginRatio: 1,
          },
        ]}
        color={["badSmell*category", (xVal, category) => getColor(category)]}
        position="category*count"
      />
      <Coordinate type="polar" />
      <Tooltip shared />
      <Interaction type="active-region" />
    </Chart>
  );
}

export default QualityEvaluation;
