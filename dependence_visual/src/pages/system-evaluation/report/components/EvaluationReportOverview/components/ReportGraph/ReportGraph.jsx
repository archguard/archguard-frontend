import React from "react";
import { Badge, Space } from "antd";

import ReactEcharts from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/scatter";
import "echarts/lib/component/polar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";

import { transformData, getStates, setOption } from "./options/scatterOption";

const colors = [
  "#c23531",
  "#2f4554",
  "#61a0a8",
  "#d48265",
  "#91c7ae",
  "#749f83",
  "#ca8622",
  "#bda29a",
  "#6e7074",
  "#546570",
  "#c4ccd3",
];

export default function ReportGraph(props) {
  let data = props.data || [];
  data = transformData(data);
  const states = getStates(data);
  data.forEach((item) => (item.color = colors[states.indexOf(item.state)]));
  const option = setOption(data);
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Space>
          {states.map((item, index) => (
            <Badge color={colors[index]} text={item} key={item}/>
          ))}
        </Space>
      </div>
      <ReactEcharts echarts={echarts} option={option} />
    </div>
  );
}
