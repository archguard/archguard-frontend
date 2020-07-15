import _ from "lodash";

export function transformByTable(data) {
  const transformedData = [];
  let groupByTable = _.groupBy(data, (item) => item.table);

  Object.keys(groupByTable).forEach((item) => {
    transformedData.push({
      table: item,
      num: groupByTable[item].reduce((total, subItem) => total + subItem.num * 1, 0),
      classes: groupByTable[item],
    });
  });

  return transformedData;
}
