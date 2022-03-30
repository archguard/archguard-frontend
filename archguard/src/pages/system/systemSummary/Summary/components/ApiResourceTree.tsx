import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from "react";

interface ApiResourceTreeProps {
  data: any[]
}

const ApiResourceTree = (props: ApiResourceTreeProps) => {
  console.log(props)
  // const [data] = useState(props.data);
  const [data] = useState({
    name: 'flare',
    children: [
      {
        name: 'data',
        children: [
          {
            name: 'converters',
            children: [
              { name: 'Converters', value: 721 },
              { name: 'DelimitedTextConverter', value: 4294 }
            ]
          },
          {
            name: 'DataUtil',
            value: 3322
          }
        ]
      }]});
  const [options, setOptions] = useState(null)

  useEffect(() => {
    setOptions({
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          id: 0,
          name: 'tree1',
          data: [data],
          top: '10%',
          left: '8%',
          bottom: '22%',
          right: '20%',
          symbolSize: 7,
          edgeShape: 'polyline',
          edgeForkPosition: '63%',
          initialTreeDepth: 3,
          lineStyle: {
            width: 2
          },
          label: {
            backgroundColor: '#fff',
            position: 'left',
            verticalAlign: 'middle',
            align: 'right'
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    })
  }, data, setOptions)

  return (
    options && <ReactECharts option={ options }/>
  )
}

export default ApiResourceTree;
