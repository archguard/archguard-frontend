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

const {
  METHOD: SIZINGMETHOD,
  MODULE: SIZINGMODULES,
  CLASS: SIZINGCLASS,
  PACKAGE: SIZINGPACKAGE,
} = SizingEvaluationIssuesConfigs; //体量维度
const {
  DATA_CLUMPS: DATACLUMPS,
  DEEP_INHERITENCE: DEEPINHERITANCE,
} = CouplingEvaluationIssuesConfigs; // 耦合维度

export enum DashboardGroup {
  COUPLING = "耦合维度",
  SIZING = "体量维度",
}

export const badSmellWording = {
  DATACLUMPS: {
    //数据泥团
    title: DATACLUMPS.title,
    badSmellDescription: DATACLUMPS.badSmellDescription,
  },
  DEEPINHERITANCE: {
    //过深继承
    title: DEEPINHERITANCE.title,
    badSmellDescription: DEEPINHERITANCE.badSmellDescription,
  },
  SIZINGMODULES: {
    //过大的模块
    title: SIZINGMODULES.title,
    badSmellDescription: SIZINGMODULES.badSmellDescription,
  },
  SIZINGPACKAGE: {
    //过大的包
    title: SIZINGPACKAGE.title,
    badSmellDescription: SIZINGPACKAGE.badSmellDescription,
  },
  SIZINGCLASS: {
    //过大的类
    title: SIZINGCLASS.title,
    badSmellDescription: SIZINGCLASS.badSmellDescription,
  },
  SIZINGMETHOD: {
    //过大的方法
    title: SIZINGMETHOD.title,
    badSmellDescription: SIZINGMETHOD.badSmellDescription,
  },
} as const;

type badSmellWordingValues = ValueOf<typeof badSmellWording>;
type badSmellWordingKeys = keyof typeof badSmellWording;

const getBadSmellWording = (badSmellType: badSmellWordingKeys): badSmellWordingValues =>
  badSmellWording[badSmellType];

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
    const { title, badSmellDescription } = getBadSmellWording(props.data.type);
    return (
      <div className={styles.header}>
        <div className={styles.statusIcon} style={{ background: levelColor }}></div>
        <div className={styles.text}>{title}</div>
        <BaTipsIcon text={badSmellDescription}></BaTipsIcon>
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
