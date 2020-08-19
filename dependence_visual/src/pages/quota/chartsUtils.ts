const getMarkLineOpt = (label: string,
                        position: string,
                        coordX: number,
                        coordY: number,
                        showLabel: boolean = true) => {
  return {
    animation: false,
    label: {
      show: showLabel,
      formatter: label,
      position: position,
      fontSize: 16,
      fontWeight: 600,
      color: '#000000'
    },
    lineStyle: { type: 'dashed' },
    tooltip: {
      show: showLabel,
      formatter: `${label}（D = 0.7）`
    },
    data: [[
      { coord: [coordX, coordY], symbol: 'none' },
      { coord: [coordY, coordX], symbol: 'none' }
    ]]
  }
}

export function getChartsOption(title: string, data: number[]) {
  return {
    title: {
      text: title,
      left: 'center',
      top: 0,
      textStyle: { color: 'red', fontSize: 22 },
    },
    grid: {
      show: true,
      x: '100px',
      y: '100px',
      width: '600px',
      height: '600px',
      backgroundColor: {
        type: 'linear',
        x: 0,
        y: 1,
        x2: 1,
        y2: 0,
        colorStops: [{
            offset: 0, color: 'red' // 0% 处的颜色
        }, {
            offset: 0.5, color: 'white' // 50% 处的颜色
        }, {
            offset: 1, color: 'red',  // 0%
        }],
        global: false // 缺省为 false
      },
    },
    tooltip: {
        formatter: 'Group {a}: ({c})'
    },
    xAxis: {
        name: 'Instability, I',
        nameLocation: 'middle',
        nameTextStyle: {
            color: '#000000',
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 40,
        },
        min: 0,
        max: 1,
        axisLabel: {
          color: '#000',
          margin: 20,
          align: 'center',
          formatter: function(value: number) {
            if (value === 0) {
              return 'Stable'
            } else if (value === 1) {
              return 'Instable'
            }
            return ''
          }
        },
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: false,
        },
    },
    yAxis: {
        name: 'Abstractness, A',
        nameLocation: 'middle',
        nameTextStyle: {
          color: '#000',
          fontSize: 18,
          fontWeight: 600,
          lineHeight: 40,
        },
        min: 0,
        max: 1,
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        },
        axisLabel: {
          color: '#000',
          margin: 20,
          align: 'center',
          rotate: 90,
          formatter: function(value: number) {
            if (value === 0) {
              return 'Concrete'
            } else if (value === 1) {
              return 'Abstract'
            }
            return ''
          }
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: false,
        },
    },
    series: [
        {
            type: 'scatter',
            markLine: getMarkLineOpt('Main Sequence', 'center', 0, 1, false)
        },
        {
            type: 'scatter',
            markLine: getMarkLineOpt('Zone of Pain', 'insideMiddleBottom', 0, 0.3)
        },
        {
            type: 'scatter',
            markLine: getMarkLineOpt('Zone of Uselessness', 'insideMiddleTop', 1, 0.7)
        },
        {
          data: data,
          type: 'scatter',
          symbolSize: 20,
          emphasis: {
            label: {
              show: true,
              formatter: function (param: any) {
                  return param.data[3];
              },
              position: 'top'
            }
          },
          itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 5,
              color: '#1890ff',
          }
      },
    ]
}
}
