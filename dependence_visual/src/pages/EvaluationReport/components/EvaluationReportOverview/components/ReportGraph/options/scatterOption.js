import _ from "lodash";
import { mapToLabel } from "../../../../../config";

export function transformData(data) {
  const transformedData = _.flattenDepth(
    data
      .map((item) => ({
        name: item.name,
        reportDms: _.groupBy(
          Object.keys(item.reportDms).map((key) => ({
            state: item.reportDms[key],
            value: key,
          })),
          "state"
        ),
      }))
      .map((item) =>
        Object.keys(item.reportDms).map((key) => ({
          dimension: item.name,
          state: key,
          value: item.reportDms[key].map((subItem) =>
            mapToLabel(subItem.value)
          ),
        }))
      ),
    1
  );

  console.log("trans", transformedData);
  return transformedData;
}

export function getStates(data) {
  const states = [...new Set(data.map((item) => item.state))];
  return states;
}

export function setOption(data) {
  const option = {
    tooltip: {
      formatter: function (params) {
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
        symbolSize: function (val) {
          return val.value.length * 8;
        },
        itemStyle: {
          color: (params) => {
            return params.data.color;
          },
        },
      },
    ],
  };

  return option;
}
