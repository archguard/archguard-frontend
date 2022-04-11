import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from "react";
import React from 'react';
import { useIntl } from "umi";

interface DatamapSankeyProps {
  dataSource: any[]
}

const RelationMap = (props: DatamapSankeyProps) => {
  const { formatMessage } = useIntl();
  const [dataSource] = useState(props.dataSource);
  const [options, setOptions] = useState(null as any)

  useEffect(() => {
    if (!dataSource) {
      return
    }

    let data: any = {
      "nodes": [],
      "links": []
    }

    for (let datum of dataSource) {
      data.links.push({
        source: datum.source,
        target: datum.target,
        value: 1
      })
    }

    let linkMap: any = {}
    for (let datum of dataSource) {
      linkMap[datum.source] = 1
      linkMap[datum.target] = 1
    }

    for (let key in linkMap) {
      data.nodes.push({
        name: key
      })
    }

    setOptions({
      // @ts-ignore
      title: {
        text: "Call"
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'sankey',
          data: data.nodes,
          links: data.links,
          emphasis: {
            focus: 'adjacency'
          },
          levels: [
            {
              depth: 0,
              itemStyle: {
                color: '#fbb4ae'
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6
              }
            },
            {
              depth: 1,
              itemStyle: {
                color: '#b3cde3'
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6
              }
            },
            {
              depth: 2,
              itemStyle: {
                color: '#ccebc5'
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6
              }
            },
            {
              depth: 3,
              itemStyle: {
                color: '#decbe4'
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6
              }
            }
          ],
          lineStyle: {
            curveness: 0.5
          }
        }
      ]
    })
  }, [dataSource, setOptions])

  return (
    options && <ReactECharts
      option={ options }
      style={ { height: '480px', width: '100%' } }/>
  )
}

export default RelationMap;
