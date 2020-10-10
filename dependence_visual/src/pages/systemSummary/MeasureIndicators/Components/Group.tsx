import { GroupDataItem, MeasureIndicatorsData } from "@/api/module/codeLine";
import { BaBadge } from "@/components/Basic/Badge/Badge";
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
  const { data, indicatorLevel } = props;
  return (
    <div className={styles.Group}>
      <div className={styles.header}>
        {data.dashboardGroup} (评分:{indicatorLevel})
      </div>
      <div className={styles.body}>
        {data.groupData.map((res: GroupDataItem, i) => {
          return (
            <div key={i} className={styles.chartItem}>
              <BaBadge value={res.level}>
                {<ChartCard indicatorLevel={res.level} data={res} />}
              </BaBadge>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Group.defaultProps = {};