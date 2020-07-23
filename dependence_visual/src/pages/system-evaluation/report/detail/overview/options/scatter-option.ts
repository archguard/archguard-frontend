import _ from "lodash";
import { mapToLabel } from "../../../config";

export function transformData(data: any) {
  const transformedData = _.flattenDepth(
    data
      .map((item: any) => ({
        name: item.name,
        reportDms: _.groupBy(
          Object.keys(item.reportDms).map((key) => ({
            state: item.reportDms[key],
            value: key,
          })),
          "state",
        ),
      }))
      .map((item: any) =>
        Object.keys(item.reportDms).map((key) => ({
          dimension: item.name,
          state: key,
          value: item.reportDms[key].map((subItem: any) => mapToLabel(subItem.value)),
        })),
      ),
    1,
  );

  console.log("trans", transformedData);
  return transformedData;
}

export function getStates(data: any) {
  const states = [...new Set(data.map((item: any) => item.state))];
  return states;
}

export function setOption(data: any) {
  const option = {
    tooltip: {
      formatter: function (params: any) {
        return params.value.value.join("<br />");
      },
    },
    toolbox: {
      bottom: 0,
      feature: {
        saveAsImage: {
          pixelRatio: 2,
        },
      },
    },
    dataset: {
      source: data,
    },
    polar: {},
    angleAxis: {
      type: "category",
      splitLine: {
        show: true,
      },
      axisTick: { show: false },
    },
    radiusAxis: {
      type: "category",
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        type: "scatter",
        coordinateSystem: "polar",
        encode: {
          radius: "state",
          angle: "dimension",
        },
        symbolSize: function (val: any) {
          return val.value.length * 8;
        },
        itemStyle: {
          color: (params: any) => {
            return params.data.color;
          },
        },
      },
    ],
  };

  return option;
}
