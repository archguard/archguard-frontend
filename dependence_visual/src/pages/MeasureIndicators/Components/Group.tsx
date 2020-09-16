import { GroupDataItem, MeasureIndicatorsData } from "@/api/module/codeLine";
import React from "react";
import { ChartCard, DashboardGroup } from "./ChartCard";
import styles from "./Group.less";

interface GroupProps {
  children?: React.ReactChildren;
  data: MeasureIndicatorsData;
}

export const Group = (props: GroupProps) => {
  const { data } = props;
  return (
    <div className={styles.Group}>
      <div className={styles.header}>{DashboardGroup[data.dashboardGroup]}</div>
      <div className={styles.body}>
        {data.groupData.map((res: GroupDataItem, i) => {
          return (
            <div key={i} className={styles.chartItem}>
              {<ChartCard data={res} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Group.defaultProps = {};
