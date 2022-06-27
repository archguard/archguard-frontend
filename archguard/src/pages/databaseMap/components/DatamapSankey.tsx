import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from "react";
import React from 'react';
import { useIntl } from "@@/plugin-locale/localeExports";

interface DatamapSankeyProps {
  dataSource: any[]
}

const DatamapSankey = (props: DatamapSankeyProps) => {
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

    let nodeMap: any = {}
    let linkMap: any = {}
    for (let datum of dataSource) {
      let tables = datum.tables.split(",")
      for (let table of tables) {
        let nodeName = datum.className;
        if (!nodeMap[nodeName]) {
          nodeMap[nodeName] = {}
        }
        let packageName = datum.packageName;
        if (!nodeMap[packageName]) {
          nodeMap[packageName] = {}
        }
        if (!nodeMap[table]) {
          nodeMap[table] = {}
        }

        let linkName = datum.className + "->" + table
        let codeLinkName = datum.packageName + "->" + datum.className
        if (!linkMap[linkName]) {
          linkMap[linkName] = 1
        } else  {
          linkMap[linkName] ++
        }

        if (!linkMap[codeLinkName]) {
          linkMap[codeLinkName] = 1
        } else  {
          linkMap[codeLinkName] ++
        }

      }
    }

    Object.keys(nodeMap).forEach((key) => {
      data.nodes.push({
        name: key
      })
    })

    for (let key in linkMap) {
      let splits = key.split("->");
      data.links.push({
        source: splits[0],
        target: splits[1],
        value: linkMap[key]
      })
    }

    setOptions({
      // @ts-ignore
      title: {
        text: formatMessage({ id: 'DATAMAP_DEP_CALL_MAP'})
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
      style={ { height: '960px', width: '100%' } }/>
  )
}

export default DatamapSankey;
