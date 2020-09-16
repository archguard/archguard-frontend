import React from "react";
import { Group, IndicatorLevel } from "./Components/Group";
import { MeasureIndicatorsData, useDashboard } from "@/api/module/codeLine";

export function getIndicatorLevel(data: MeasureIndicatorsData): IndicatorLevel {
  // 取数组内的最低评分 ，评分高低依次为：A > B >C >D
  const { groupData } = data;
  groupData.sort((x, y) => {
    const level1 = x.level.toUpperCase();
    const level2 = y.level.toUpperCase();
    if (level1 < level2) {
      return -1;
    }
    if (level1 > level2) {
      return 1;
    }
    return 0;
  });
  return groupData[groupData.length - 1].level;
}

const MeasureIndicators = () => {
  const { data } = useDashboard();
  return (
    <div>
      {data?.map((res, i) => {
        const indicatorLevel = getIndicatorLevel(res);
        return <Group indicatorLevel={indicatorLevel} key={i} data={res}></Group>;
      })}
    </div>
  );
};

export default MeasureIndicators;
