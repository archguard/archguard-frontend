import React from "react";
import { Chart, Tooltip, Interval, Coordinate, Interaction, Legend } from "bizcharts";
import styles from "./QualityEvaluation.less";
import { Overview } from "@/api/module/codeLine";
import { ValueOf } from "@/utils/type";

interface QualityEvaluation {
  name?: string;
  data: Overview[];
}

const CATEGORY_CONFIG = {
  SIZING: {
    color: "#ee8572",
    text: "体量过大",
  },
  COUPLING: {
    color: "#4d64b5",
    text: "过高耦合",
  },
} as const;

function getColorAndText(category: keyof typeof CATEGORY_CONFIG): ValueOf<typeof CATEGORY_CONFIG> {
  return CATEGORY_CONFIG[category];
}

function QualityEvaluation(props: QualityEvaluation) {
  const { data, name } = props;

  return (
    <div className={styles.QualityEvaluation}>
      <Chart width={300} height={231} data={data} autoFit>
        <Legend visible={false} />
        <Interval
          adjust={[
            {
              type: "dodge",
              marginRatio: 1,
            },
          ]}
          color={["badSmell*category", (xVal, category) => getColorAndText(category).color]}
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
