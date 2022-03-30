import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from "react";
import CodeSupport from "@/pages/system/systemSummary/Summary/d3Support/CodeSupport";

interface ApiResourceTreeProps {
  dataSource: any
}

const ApiResourceTree = (props: ApiResourceTreeProps) => {
  const [ dataSource ] = useState(props.dataSource);
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
    let apiMap = {}
    for (let element of dataSource) {
      apiMap[element.sourceUrl] = {
        name: element.sourceUrl,
        value: 0
      }
    }

    console.log(apiMap)
    // let hierarchy = CodeSupport.hierarchy(apiMap);
    // console.log(hierarchy)

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
