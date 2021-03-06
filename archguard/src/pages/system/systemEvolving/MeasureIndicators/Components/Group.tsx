import { GroupDataItem, MeasureIndicatorsData } from "@/api/module/codeLine";
import React from "react";
import { ChartCard } from "./ChartCard";
import styles from "./Group.less";

export type IndicatorLevel = "A" | "B" | "C" | "D";
interface GroupProps {
  children?: React.ReactChildren;
  data: MeasureIndicatorsData;
  indicatorLevel: IndicatorLevel;
}

export const Group = (props: GroupProps) => {
  const { data } = props;
  return (
    <div className={styles.Group}>
      <div className={styles.header}>
        <div className={styles.icon}></div>
        <div className={styles.dashboardGroup}>{data.dashboardGroup}</div>
      </div>

      <div className={styles.body}>
        {data.groupData.map((res: GroupDataItem, i) => {
          return (
            <div key={i} className={styles.chartItem}>
              <ChartCard indicatorLevel={res.level} data={res} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Group.defaultProps = {};
