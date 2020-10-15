import React from "react";
import { Chart, Tooltip, Interval, Coordinate, Interaction, Legend } from "bizcharts";
import styles from "./QualityEvaluation.less";
import { Overview } from "@/api/module/codeLine";
import { ValueOf } from "@/utils/utils";
import { BaTipsIcon } from '@/components/Basic/TipsIcon/TipsIcon';

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

function StructuredText(title: string, body: string[]) {
  return (<div>
    {title}:
    {body.map(line => { return <div key={line}>・ {line}</div> })}
  </div>);
}

const descriptionText = StructuredText('根据您系统所选的‘坏味道阈值’，我们对不同维度的评估结果进行了1-4级的划分',
  ['1级为优秀，甚少检获坏味道，架构质量棒棒哒',
    '2级为良好，存在坏味道、但风险、危害都还可控',
    '3级为警惕，坏味道已累积不少，请及时悬崖勒马',
    '4级为危险，坏味道数量远超平均水平，如果不希望系统被人道毁灭，需预留足够时间进行重构改造']);

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
      <div className={styles.name}>
        {name}
        <BaTipsIcon text={descriptionText}>i</BaTipsIcon>
      </div>
    </div>
  );
}

export default QualityEvaluation;
