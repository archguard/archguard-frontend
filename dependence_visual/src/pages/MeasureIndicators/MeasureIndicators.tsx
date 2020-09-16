import React, { useEffect, useState } from "react";
import { Group } from "./Components/Group";
import { MockData2 } from "@/mock/data";
import { getDashboard, MeasureIndicatorsData } from "@/api/module/codeLine";

interface MeasureIndicatorsProps {
  children?: React.ReactChildren;
}

const MeasureIndicators = (props: MeasureIndicatorsProps) => {
  const [groupData, setGroupData] = useState<MeasureIndicatorsData[]>([]);

  useEffect(() => {
    getDashboard().then((res) => {
      console.log('res: ', res);
      setGroupData(res);
    });
  }, []);

  return (
    <div>
      {groupData.map((res, i) => (
        <Group key={i} data={res}></Group>
      ))}
    </div>
  );
};

MeasureIndicators.defaultProps = {};

export default MeasureIndicators;
