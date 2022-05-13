import ReactECharts from "echarts-for-react";
import React, { useEffect, useState } from "react";

interface LineCountChartProps {
  dataSource: LineCount[];
}

function LineCountChart(props: LineCountChartProps) {
  const [dataSource] = useState(props.dataSource);
  const [options, setOptions] = useState(null as any);

  useEffect(() => {
    if (!dataSource) {
      return;
    }

    let data = [];
    for (let lineCount of dataSource) {
      data.push({
        name: lineCount.language,
        value: lineCount.lineCount
      });
    }

    setOptions({
      tooltip: {
        trigger: "item"
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData
      },
      series: [
        {
          name: "Line Count",
          type: "pie",
          radius: ["60%", "80%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ]
    });
  }, [dataSource, setOptions]);

  return (
    options && <ReactECharts option={ options } style={ { height: "350px", width: "600px" } } />
  );
}

export default LineCountChart;
