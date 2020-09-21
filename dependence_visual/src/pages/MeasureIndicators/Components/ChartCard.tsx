import { GroupDataItem } from "@/api/module/codeLine";
import { BaCard } from "@/components/Basic/Card/Card";
import { BaTipsIcon } from "@/components/Basic/TipsIcon/TipsIcon";
import { CouplingEvaluationIssuesConfigs } from "@/pages/CouplingEvaluation/CouplingEvaluationIssuesList.config";
import { SizingEvaluationIssuesConfigs } from "@/pages/SizingEvaluation/SizingEvaluationIssuesList.config";
import { ValueOf } from "@/utils/type";
import { Chart, Area } from "bizcharts";
import React from "react";
import styles from "./ChartCard.less";
import { IndicatorLevel } from "./Group";

enum ChartField {
  x = "date",
  y = "value",
}

const { METHOD, MODULE, CLASS, PACKAGE } = SizingEvaluationIssuesConfigs; //体量维度
const { DATA_CLUMPS, DEEP_INHERITENCE } = CouplingEvaluationIssuesConfigs; // 耦合维度

export enum DashboardGroup {
  COUPLING = "耦合维度",
  SIZING = "体量维度",
}

export const badSmellWording = {
  数据泥团: DATA_CLUMPS.badSmellDescription,
  过深继承: DEEP_INHERITENCE.badSmellDescription,
  过大的模块: MODULE.badSmellDescription,
  过大的包: PACKAGE.badSmellDescription,
  过大的类: CLASS.badSmellDescription,
  过大的方法: METHOD.badSmellDescription,
} as const;

type badSmellWordingValues = ValueOf<typeof badSmellWording>;
export type badSmellWordingKeys = keyof typeof badSmellWording;

interface ChartItemProps extends Pick<GroupDataItem, "graphData"> {
  color: INDICATOR_LEVEL_COLOR.fail | INDICATOR_LEVEL_COLOR.pass;
}

function ChartItem(props: ChartItemProps) {
  const { graphData, color } = props;
  const scale = {
    [ChartField.y]: {
      min: 10000,
      nice: true,
    },
    [ChartField.x]: {
      range: [0, 1],
      tickCount: 1,
    },
  };

  return (
    <div>
      <Chart scale={scale} height={100} width={200} data={graphData} autoFit>
        <Area color={color} position={`${ChartField.x}*${ChartField.y}`} />
      </Chart>
    </div>
  );
}

export enum INDICATOR_LEVEL_COLOR {
  pass = "#61bd4f",
  fail = "#eb5a46",
}

function getLevelColor(
  indicatorLevel: IndicatorLevel,
): INDICATOR_LEVEL_COLOR.fail | INDICATOR_LEVEL_COLOR.pass {
  const colorMap: Record<
    IndicatorLevel,
    INDICATOR_LEVEL_COLOR.fail | INDICATOR_LEVEL_COLOR.pass
  > = {
    A: INDICATOR_LEVEL_COLOR.pass,
    B: INDICATOR_LEVEL_COLOR.pass,
    C: INDICATOR_LEVEL_COLOR.fail,
    D: INDICATOR_LEVEL_COLOR.fail,
  };
  return colorMap[indicatorLevel];
}

export interface ChartCardProps {
  data: GroupDataItem;
  indicatorLevel: IndicatorLevel;
}

export const ChartCard = (props: ChartCardProps) => {
  const { graphData } = props.data;
  const lastValue = graphData[0].value;
  const currentValue = graphData[graphData.length - 1].value;
  const levelColor = getLevelColor(props.indicatorLevel);

  function Header() {
    return (
      <div className={styles.header}>
        <div className={styles.statusIcon} style={{ background: levelColor }}></div>
        <div className={styles.text}>{props.data.type}</div>
        <BaTipsIcon text={badSmellWording[props.data.type]}></BaTipsIcon>
      </div>
    );
  }

  function Description() {
    return (
      <div className={styles.description}>
        上次<span className={styles.count}> {lastValue} </span>个 / 当前
        <span className={styles.count}> {currentValue} </span>个
      </div>
    );
  }

  return (
    <div className={styles.ChartCard}>
      <BaCard>
        <Header></Header>
        <Description></Description>
        <ChartItem color={levelColor} graphData={props.data.graphData}></ChartItem>
      </BaCard>
    </div>
  );
};

ChartCard.defaultProps = {};
