import lodash from "lodash";

export default function setRadarOption(data: any) {
  const transformedData: any[] = [];

  data.forEach((item: any, index: number) => {
    Object.keys(item.reportDms).forEach((subItem) => {
      transformedData.push({
        dimension: item.name,
        dimensionIndex: index,
        state: item.reportDms[subItem],
        name: subItem,
      });
    });
  });

  const indicator = data.map((item: any) => ({
    name: item.name,
    max: Object.keys(item.reportDms).length,
  }));

  const dataGroupByState = lodash.groupBy(transformedData, (item) => item.state);

  const dd = Object.keys(dataGroupByState).map((item) => {
    const value = lodash.groupBy(dataGroupByState[item], (subItem) => subItem.dimensionIndex);
    return {
      name: item,
      value: Object.keys(value).map((subItem) => value[subItem].length),
    };
  });

  const option = {
    legend: {},
    radar: {
      indicator: indicator,
      radius: "60%",
    },
    series: {
      type: "radar",
      data: dd,
    },
  };

  return option;
}
