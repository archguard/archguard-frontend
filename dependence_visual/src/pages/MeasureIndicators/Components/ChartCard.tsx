import { GroupDataItem } from "@/api/module/codeLine";
import { BaCard } from "@/components/Basic/Card/Card";
import { BaTipsIcon } from "@/components/Basic/TipsIcon/TipsIcon";
import { CouplingEvaluationIssuesConfigs } from "@/pages/CouplingEvaluation/CouplingEvaluationIssuesList.config";
import { SizingEvaluationIssuesConfigs } from "@/pages/SizingEvaluation/SizingEvaluationIssuesList.config";
import { Chart, Area } from "bizcharts";
import React from "react";
import styles from "./ChartCard.less";

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

const badSmellWording = {
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
};

export enum BadSmellType {
  DATACLUMPS = "数据泥团",
  DEEPINHERITANCE = "过深继承",
  SIZINGMODULES = "过大的模块",
  SIZINGPACKAGE = "过大的包",
  SIZINGCLASS = "过大的类",
  SIZINGMETHOD = "过大的方法",
}

const getBadSmellWording = (
  badSmellType: keyof typeof BadSmellType,
): { title: string; badSmellDescription: string } => badSmellWording[badSmellType];

interface ChartItemProps extends Pick<GroupDataItem, "graphData"> {}

function ChartItem(props: ChartItemProps) {
  const scale = {
    value: {
      min: 10000,
      nice: true,
    },
    data: {
      range: [0, 1],
      tickCount: 1,
    },
  };

  return (
    <div>
      <Chart scale={scale} height={100} width={200} data={props.graphData} autoFit>
        <Area
          color={[
            "x",
            (xVal) => {
              if (xVal === "a") {
                return "red";
              }
              return "blue";
            },
          ]}
          position="data*value"
          tickCount={0}
          label="false"
        />
      </Chart>
    </div>
  );
}

interface ChartCardProps {
  data: GroupDataItem;
}

export const ChartCard = (props: ChartCardProps) => {
  const { graphData } = props.data;
  const lastValue = graphData[0].value;
  const currentValue = graphData[graphData.length - 1].value;

  function Header() {
    const { title, badSmellDescription } = getBadSmellWording(props.data.type);
    return (
      <div className={styles.header}>
        <div className={styles.statusIcon}></div>
        <div className={styles.text}>{title}</div>
        <BaTipsIcon text={badSmellDescription}></BaTipsIcon>
      </div>
    );
  }

  function Description() {
    return (
      <div className={styles.description}>
        上次<span className={styles.count}> {lastValue} </span>次 / 当前
        <span className={styles.count}> {currentValue} </span>次
      </div>
    );
  }

  return (
    <div className={styles.ChartCard}>
      <BaCard>
        <Header></Header>
        <Description></Description>
        <ChartItem graphData={props.data.graphData}></ChartItem>
      </BaCard>
    </div>
  );
};

ChartCard.defaultProps = {};
