import { GroupDataItem } from "@/api/module/codeLine";
import { BaCard } from "@/components/Basic/Card/Card";
import { BaTipsIcon } from "@/components/Basic/TipsIcon/TipsIcon";
import { Chart, Area } from "bizcharts";
import React from "react";
import styles from "./ChartCard.less";

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
  return (
    <div className={styles.ChartCard}>
      <BaCard>
        <Header></Header>
        <div className={styles.description}>
          上次<span className={styles.count}>5</span>次/当前<span className={styles.count}>3</span>
          次
        </div>
        <ChartItem graphData={props.data.graphData}></ChartItem>
      </BaCard>
    </div>
  );
};

ChartCard.defaultProps = {};
