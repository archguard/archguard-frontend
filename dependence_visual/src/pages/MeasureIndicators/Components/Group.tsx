import { GroupDataItem, MeasureIndicatorsData } from "@/api/module/codeLine";
import { PickFieldType } from "@/utils/type";
import React from "react";
import { ChartCard, ChartCardProps, DashboardGroup } from "./ChartCard";
import styles from "./Group.less";

export type IndicatorLevel = "A" | "B" | "C" | "C";
interface GroupProps {
  children?: React.ReactChildren;
  data: MeasureIndicatorsData;
  indicatorLevel: IndicatorLevel;
}

export const Group = (props: GroupProps) => {
  const { data, indicatorLevel } = props;
  return (
    <div className={styles.Group}>
      <div className={styles.header}>
        {DashboardGroup[data.dashboardGroup]} (评分:{indicatorLevel})
      </div>
      <div className={styles.body}>
        {data.groupData.map((res: GroupDataItem, i) => {
          return (
            <div key={i} className={styles.chartItem}>
              {<ChartCard indicatorLevel={res.level} data={res} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Group.defaultProps = {};
