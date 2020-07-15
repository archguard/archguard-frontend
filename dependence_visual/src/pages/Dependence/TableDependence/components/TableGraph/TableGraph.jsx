import React from "react";
import ReactEcharts from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";


import { setOption } from "./config";

export default function TableDependence(props) {
  return (
    <div>
      <ReactEcharts
        echarts={echarts}
        option={setOption(props.data)}
        onEvents={{ click: (e) => console.log(e) }}
      />
    </div>
  );
}
