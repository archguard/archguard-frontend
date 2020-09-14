import { GroupDataItem } from "@/api/module/codeLine";
import { BaCard } from "@/components/Basic/Card/Card";
import { BaTipsIcon } from "@/components/Basic/TipsIcon/TipsIcon";
import { Chart, Area } from "bizcharts";

import React from "react";
import styles from "./ChartCard.less";

export enum IndicatorsType {}

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.statusIcon}></div>
      <div className={styles.text}>生产发布频率</div>
      <BaTipsIcon text="111111"></BaTipsIcon>
    </div>
  );
}

interface ChartItemProps extends Pick<GroupDataItem, "graphData"> {}

function ChartItem(props: ChartItemProps) {
  const scale = {
    value: {
      min: 10000,
      nice: true,
    },
    date: {
      range: [0, 1],
    },
  };

  return (
    <div>
      <Chart scale={scale} height={60} data={props.graphData} autoFit>
        <Area position="date*value" />
      </Chart>
    </div>
  );
}

interface ChartCardProps {
  data: GroupDataItem;
}

export const ChartCard = (props: ChartCardProps) => {
  return (
    <div className={styles.ChartCard}>
      <BaCard>
        <Header></Header>
        <div className={styles.description}>
          上一次一周<span>5</span>次/当前一周<span>3</span>次
        </div>
        <ChartItem graphData={props.data.graphData}></ChartItem>
      </BaCard>
    </div>
  );
};

ChartCard.defaultProps = {};
