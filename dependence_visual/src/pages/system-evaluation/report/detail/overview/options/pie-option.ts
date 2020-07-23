export default function (data: any) {
  return {
    series: [
      {
        type: "pie",
        data: data.map((item: any) => ({ name: item.name, value: 10 })),
      },
    ],
  };
}
