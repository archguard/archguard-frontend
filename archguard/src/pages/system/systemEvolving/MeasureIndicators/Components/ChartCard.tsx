import { GroupDataItem } from "@/api/module/codeLine";
import { BaBadge } from "@/components/Basic/Badge/Badge";
import { BaCard } from "@/components/Basic/Card/Card";
import { BaTipsIcon } from "@/components/Basic/TipsIcon/TipsIcon";
import { CohesionEvaluationIssuesConfigs } from "@/pages/system/systemEvaluation/CohesionEvaluation/CohesionEvaluationIssuesList.config";
import { CouplingEvaluationIssuesConfigs } from "@/pages/system/systemEvaluation/CouplingEvaluation/CouplingEvaluationIssuesList.config";
import { RedundancyConfig } from "@/pages/system/systemEvaluation/Redundancy/Redundancy.config";
import { SizingEvaluationIssuesConfigs } from "@/pages/system/systemEvaluation/SizingEvaluation/SizingEvaluationIssuesList.config";
import { TEST_EVALUATION_CONFIG } from "@/pages/system/systemEvaluation/TestEvaluation/TestEvaluation.config";
import { ValueOf } from "@/utils/utils";
import { Chart, Area, Axis } from "bizcharts";
import React from "react";
import styles from "./ChartCard.less";
import { IndicatorLevel } from "./Group";

enum ChartField {
  x = "date",
  y = "value",
}

const { METHOD, MODULE, CLASS, PACKAGE } = SizingEvaluationIssuesConfigs; //体量维度
const {
  DATA_CLUMPS,
  DEEP_INHERITENCE,
  HUB_PACKAGE,
  HUB_MODULE,
  HUB_CLASS,
  HUB_METHOD,
  CIRCULAR_DEPENDENCY,
} = CouplingEvaluationIssuesConfigs; // 耦合维度

export enum DashboardGroup {
  COUPLING = "耦合维度",
  SIZING = "体量维度",
}

//TODO:  需要重构，不要直接使用中文做key，因为中文描述可能会改变,需要和后端商量每个坏味道的 枚举值
export const badSmellWording = {
  数据泥团: DATA_CLUMPS.badSmellDescription,
  过深继承: DEEP_INHERITENCE.badSmellDescription,
  子模块过大: MODULE.badSmellDescription,
  包过大: PACKAGE.badSmellDescription,
  类过大: CLASS.badSmellDescription,
  方法过大: METHOD.badSmellDescription,
  枢纽包: HUB_PACKAGE.badSmellDescription,
  枢纽模块: HUB_MODULE.badSmellDescription,
  枢纽类: HUB_CLASS.badSmellDescription,
  枢纽方法: HUB_METHOD.badSmellDescription,
  循环依赖: CIRCULAR_DEPENDENCY.badSmellDescription,
  冗余元素: RedundancyConfig.element.badSmellDescription,
  过度泛化: RedundancyConfig.generalize.badSmellDescription,
  数据类: CohesionEvaluationIssuesConfigs.DATA_CLASS.badSmellDescription,
  散弹式修改: CohesionEvaluationIssuesConfigs.SHOTGUN_SURGERY.badSmellDescription,
  被忽略的测试: TEST_EVALUATION_CONFIG.ignore.badSmellDescription,
  含Sleep的测试: TEST_EVALUATION_CONFIG.sleepTest.badSmellDescription,
  缺乏校验的测试: TEST_EVALUATION_CONFIG.unAssert.badSmellDescription,
} as const;

type badSmellWordingValues = ValueOf<typeof badSmellWording>;
export type badSmellWordingKeys = keyof typeof badSmellWording;

interface ChartItemProps extends Pick<GroupDataItem, "graphData"> {
  color: INDICATOR_LEVEL_COLOR.fail | INDICATOR_LEVEL_COLOR.pass;
}

export function ChartItem(props: ChartItemProps) {
  const { graphData, color } = props;
  const scale = {
    [ChartField.y]: {
      min: 10000,
      nice: true,
    },
    [ChartField.x]: {
      range: [0, 1],
      tickCount: graphData.length,
      type: 'time',
      mask: 'MM-DD',
    },
  };

  return (
    <div className={styles.chart}>
      <Chart scale={scale} height={150} width={300} data={graphData} padding={[10, 20, 40, 30]} autoFit>
        <Area color={color} position={`${ChartField.x}*${ChartField.y}`} />
        <Axis name={`${ChartField.x}`} label={{ offset: 25, rotate: 45 }} />
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
  const lastValue = graphData[0]?.value;
  const currentValue = graphData[graphData.length - 1]?.value;
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
        <BaBadge value={props.indicatorLevel}></BaBadge>
        <Header></Header>
        <Description></Description>
        <ChartItem color={levelColor} graphData={props.data.graphData}></ChartItem>
      </BaCard>
    </div>
  );
};

ChartCard.defaultProps = {};
