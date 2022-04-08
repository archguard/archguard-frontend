import ReactECharts from 'echarts-for-react';
import React from 'react';
import { useEffect, useState } from "react";
import CodeSupport from "@/pages/system/systemSummary/Summary/d3Support/CodeSupport";

interface ApiResourceTreeProps {
  dataSource: any
}

const ApiResourceTree = (props: ApiResourceTreeProps) => {
  const [dataSource] = useState(props.dataSource);
  const [options, setOptions] = useState(null as any)

  useEffect(() => {
    if (!dataSource) {
      return
    }

    let apiMap: any = {}
    for (let element of dataSource) {
      apiMap["root/" + element.sourceUrl] = {
        name: "root/" + element.sourceUrl,
        value: element.className + "." + element.methodName
      }
    }

    let dataMap = Object.values(apiMap)
    let hierarchy = (CodeSupport.hierarchy(dataMap) as any).children[0];

    setOptions({
      // @ts-ignore
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          data: [hierarchy],
          top: '1%',
          left: '7%',
          bottom: '1%',
          right: '20%',
          symbolSize: 7,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 12
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
  }, [dataSource, setOptions])

  return (
    options && <ReactECharts
      option={ options }
      style={ { height: '960px', width: '100%' } }/>
  )
}

export default ApiResourceTree;
