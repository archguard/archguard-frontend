import { EChartOption } from 'echarts'

const getMarkLineOpt = (
  label: string,
  position: string,
  coordX: number,
  coordY: number,
  showLabel: boolean = true
) => {
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

const getAxisConfig = (name: string, axis: 'x' | 'y'): EChartOption.XAxis | EChartOption.YAxis => {
  const axisLabel = {
    x: ['Stable', 'Instable'],
    y: ['Concrete', 'Abstract'],
  }

  return {
    name,
    nameLocation: 'middle',
    nameTextStyle: {
      color: '#000000',
      fontSize: 18,
      fontWeight: "bold",
      lineHeight: 40,
    },
    min: 0, max: 1,
    axisLabel: {
      color: '#000',
      margin: 20,
      align: 'center',
      rotate: axis === 'y' ? 90 : 0,
      formatter: (value: number) => axisLabel[axis][value],
    },
    axisLine: { lineStyle: { color: '#ddd' } },
    axisTick: { show: false },
    splitLine: { show: false },
  }
}

const defaultSeriesMarkLineOpt = [
  {
    type: 'scatter',
    markLine: getMarkLineOpt('Main Sequence', 'center', 0, 1, false)
  }, {
    type: 'scatter',
    markLine: getMarkLineOpt('Zone of Pain', 'insideMiddleBottom', 0, 0.3)
  }, {
    type: 'scatter',
    markLine: getMarkLineOpt('Zone of Uselessness', 'insideMiddleTop', 1, 0.7)
}]

export function getChartsOption(data?: number[]): EChartOption {
  return {
    title: {
      top: 15,
      left: 'center',
      text: 'Distance From Main Sequence: \n zone of pain and zone of uselessness',
      textStyle: { color: 'red', fontSize: 22 },
    },
    tooltip: { show: true },
    grid: {
      show: true,
      top: '10%', left: '10%',
      width: '80%', height: '80%',
      backgroundColor: {
        type: 'linear',
        x: 0, y: 1, x2: 1, y2: 0,
        global: false,
        colorStops: [
          { offset: 0, color: 'red' },
          { offset: 0.5, color: 'white' },
          { offset: 1, color: 'red' }
        ],
      } as unknown as string,
    },
    xAxis: getAxisConfig('Instability, I', 'x') as EChartOption.XAxis,
    yAxis: getAxisConfig('Abstractness, A', 'y') as EChartOption.YAxis,
    series: !data ? defaultSeriesMarkLineOpt :
      [...defaultSeriesMarkLineOpt, {
        data: [data],
        type: 'scatter',
        symbolSize: 20,
        tooltip: {
          formatter: ({ value }: any) => {
            return `Abstractness: ${value[0]} \n Instability: ${value[1]}`
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
