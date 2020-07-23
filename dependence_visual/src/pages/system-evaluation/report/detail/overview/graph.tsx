import { Badge, Space } from "antd";
import ReactEcharts from "echarts-for-react/lib/core";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/scatter";
import "echarts/lib/component/legend";
import "echarts/lib/component/polar";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/tooltip";
import echarts from "echarts/lib/echarts";
import React from "react";
import { getStates, setOption, transformData } from "./options/scatter-option";

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

export type Dimension = {
  name: string;
  reportDms: {
    [key: string]: string;
  };
};

interface ReportGraphPops {
  dimensions: Dimension[];
}

export default function ReportGraph({ dimensions = [] }: ReportGraphPops) {
  const data = transformData(dimensions);
  const states = getStates(data);
  data.forEach((item) => (item.color = colors[states.indexOf(item.state)]));
  const option = setOption(data);
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Space>
          {states.map((item, index) => (
            <Badge color={colors[index]} text={item} key={item} />
          ))}
        </Space>
      </div>
      <ReactEcharts echarts={echarts} option={option} />
    </div>
  );
}
