import React from "react";
import { Chart, Tooltip, Interval, Coordinate, Interaction, Legend } from "bizcharts";
import styles from "./QualityEvaluation.less";
import { Overview } from '@/api/module/codeLine';

interface QualityEvaluation {
  name?: string;
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
  const { data, name } = props;

  return (
    <div className={styles.QualityEvaluation}>
      <Chart width={300} height={231} data={data} autoFit >
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
      <div className={styles.name}>{name}</div>
    </div>
  );
}

export default QualityEvaluation;
