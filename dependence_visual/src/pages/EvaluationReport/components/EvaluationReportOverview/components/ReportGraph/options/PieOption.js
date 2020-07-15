export default function (data) {
  return {
    series: [
      {
        type: "pie",
        data: data.map((item) => ({ name: item.name, value: 10 })),
      },
    ],
  };
}
