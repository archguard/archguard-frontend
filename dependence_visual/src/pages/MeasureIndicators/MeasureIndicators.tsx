import React from "react";
import { Group } from "./Components/Group";
import { MockData2 } from "@/mock/data";

interface MeasureIndicatorsProps {
  children?: React.ReactChildren;
}

const MeasureIndicators = (props: MeasureIndicatorsProps) => {
  return (
    <div>
      {MockData2.map((res, i) => (
        <Group key={i} data={res}></Group>
      ))}
    </div>
  );
};

MeasureIndicators.defaultProps = {};

export default MeasureIndicators;
