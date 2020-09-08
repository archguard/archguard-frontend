import React from "react";
import { Chart, Tooltip, Interval, Coordinate, Interaction, Legend } from "bizcharts";
import { Overview } from "@/api/module/overview";
import { MockData1 } from '@/mock/data';

interface QualityEvaluation {
  data: Overview[];
}

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

function getColor(category: Category): string {
  if (!category) return "";
  return COLOR_MAP[category];
}

function QualityEvaluation(props: QualityEvaluation) {
  const { data } = props;

  return (
    <Chart height={261} data={data} autoFit padding="auto">
      <Legend visible={false} />
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
