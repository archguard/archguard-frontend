import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from "react";
import React from 'react';

interface DatamapSankeyProps {
  dataSource: any[],
  title: String
}

const RelationMap = (props: DatamapSankeyProps) => {
  const [dataSource] = useState(props.dataSource);
  const [options, setOptions] = useState(null as any)
  const [title] = useState(props.title)

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
        text: title
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
