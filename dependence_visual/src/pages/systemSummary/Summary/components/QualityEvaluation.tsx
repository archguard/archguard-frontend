import React from "react";
import { Chart, Tooltip, Interval, Coordinate, Interaction, Legend } from "bizcharts";
import styles from "./QualityEvaluation.less";
import { Overview } from "@/api/module/codeLine";
import { ValueOf } from "@/utils/utils";

interface QualityEvaluation {
  name?: string;
  data: Overview[];
}

export const LEVEL_SCORE = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
} as const;

const CATEGORY_CONFIG = {
  体量过大: "#ee8572",
  过高耦合: "#4d64b5",
  冗余度高: "#00a8cc",
  内聚度不足: "#27496d",
} as const;

function getColor(category: keyof typeof CATEGORY_CONFIG): ValueOf<typeof CATEGORY_CONFIG> {
  return CATEGORY_CONFIG[category];
}

function getLevelScore(level: keyof typeof LEVEL_SCORE): ValueOf<typeof LEVEL_SCORE> {
  return LEVEL_SCORE[level];
}

function formatData(data: Overview[]): Overview[] {
  return data.map((res) => ({
    ...res,
    count: getLevelScore(res.level),
  }));
}

const scale = {
  count: {
    ticks: [1, 2, 3, 4], // 如果配置了该项，则轴的刻度即显示数组中指定的刻度。
  },
};

function QualityEvaluation(props: QualityEvaluation) {
  const { data, name } = props;
  const formattedData = formatData(data);

  return (
    <div className={styles.QualityEvaluation}>
      <Chart scale={scale} width={360} height={261} data={formattedData} autoFit>
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
