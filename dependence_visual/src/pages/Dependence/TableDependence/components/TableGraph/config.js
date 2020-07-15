export function setOption(data) {
  const usedData = data.filter((item) => item.used > 0);

  const option = {
    tooltip: {
      formatter: "{b} : {c} ({d}%)",
    },
    series: {
      type: "pie",
      data: [
        { name: "unused", value: data.length - usedData.length },
        { name: "used", value: usedData.length },
      ],
    },
  };

  return option;
}