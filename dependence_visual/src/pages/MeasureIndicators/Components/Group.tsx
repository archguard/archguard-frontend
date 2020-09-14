import { MeasureIndicators } from "@/api/module/codeLine";
import { BaCard } from "@/components/Basic/Card/Card";
import React from "react";
import { ChartCard } from "./ChartCard";
import styles from "./Group.less";

interface GroupProps {
  children?: React.ReactChildren;
  data: MeasureIndicators;
}

export const Group = (props: GroupProps) => {
  const { data } = props;
  return (
    <div className={styles.Group}>
      <div className={styles.header}>{data.groupKey}</div>
      <div className={styles.body}>
        {data.groupData.map((res, i) => {
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
