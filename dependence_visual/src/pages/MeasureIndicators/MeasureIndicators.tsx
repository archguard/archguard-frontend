import React from "react";
import { Chart, Area } from "bizcharts";
import { BaCard } from "@/components/Basic/Card/Card";

interface MeasureIndicatorsProps {
  children?: React.ReactChildren;
}

const MeasureIndicators = (props: MeasureIndicatorsProps) => {
  const data = [
    { year: 1991, value: 15468 },
    { year: "1992", value: 16100 },
    { year: "1993", value: 15900 },
    { year: "1994", value: 17409 },
    { year: "1995", value: 17000 },
    { year: "1996", value: 21056 },
    { year: "1997", value: 31982 },
    { year: "1998", value: 32040 },
    { year: "1999", value: 33233 },
  ];

  const scale = {
    value: {
      min: 10000,
      nice: true,
    },
    year: {
      range: [0, 1],
    },
  };

  return (
    <div>
      <BaCard
        header={() => {
          return <h1>222</h1>;
        }}
      ></BaCard>
      <BaCard
        header={() => {
          return <h1>222</h1>;
        }}
      ></BaCard>
      <BaCard
        header={() => {
          return <h1>222</h1>;
        }}
      ></BaCard>

      {/* <Chart scale={scale} height={200} data={data} autoFit>
      <Area position="year*value" />
    </Chart> */}
    </div>
  );
};

MeasureIndicators.defaultProps = {};

export default MeasureIndicators;
