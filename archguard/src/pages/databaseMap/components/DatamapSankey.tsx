import React, { useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useIntl } from "@@/plugin-locale/localeExports";
import * as echarts from 'echarts';

interface DatamapSankeyProps {
  dataSource: any[]
}

const DatamapSankey = (props: DatamapSankeyProps) => {
  const { formatMessage } = useIntl();
  const [dataSource] = useState(props.dataSource);
  const [options, setOptions] = useState(null as any);
  const chartRef = useRef<any>(null);

  // Detect cycles in the graph using DFS
  const detectCycles = (graph: Map<string, Set<string>>, start: string): string[] => {
    const visited = new Set<string>();
    const path = new Set<string>();
    const cycles: string[] = [];

    const dfs = (node: string): boolean => {
      visited.add(node);
      path.add(node);

      const neighbors = graph.get(node) || new Set();
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor)) {
            cycles.push(`${node}->${neighbor}`);
          }
        } else if (path.has(neighbor)) {
          cycles.push(`${node}->${neighbor}`);
          return true;
        }
      }

      path.delete(node);
      return false;
    };

    dfs(start);
    return cycles;
  };

  // Build directed graph and remove cycles
  const buildAcyclicGraph = (nodes: Set<string>, links: Map<string, number>) => {
    const graph = new Map<string, Set<string>>();
    for (const [link, _] of links) {
      const [source, target] = link.split('->');
      if (!graph.has(source)) {
        graph.set(source, new Set());
      }
      graph.get(source)?.add(target);
    }

    const processedLinks = new Map(links);
    for (const node of nodes) {
      const cycles = detectCycles(graph, node);
      for (const cycle of cycles) {
        processedLinks.delete(cycle);
      }
    }

    return processedLinks;
  };

  useEffect(() => {
    if (!dataSource) {
      return;
    }

    const nodes = new Set<string>();
    const links = new Map<string, number>();

    // Process nodes and links
    for (const datum of dataSource) {
      const tables = datum.tables.split(",");
      const className = datum.className;
      const packageName = datum.packageName;

      nodes.add(className);
      nodes.add(packageName);
      tables.forEach((table: string) => nodes.add(table));

      for (const table of tables) {
        const classToTable = `${className}->${table}`;
        const packageToClass = `${packageName}->${className}`;

        links.set(classToTable, (links.get(classToTable) || 0) + 1);
        links.set(packageToClass, (links.get(packageToClass) || 0) + 1);
      }
    }

    // Remove cycles and build final data structure
    const acyclicLinks = buildAcyclicGraph(nodes, links);
    const data = {
      nodes: Array.from(nodes).map(name => ({ name })),
      links: Array.from(acyclicLinks.entries()).map(([key, value]) => {
        const [source, target] = key.split('->');
        return { source, target, value };
      })
    };

    setOptions({
      title: {
        text: formatMessage({ id: 'DATAMAP_DEP_CALL_MAP' })
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: ({ data }: any) => {
          if (data.source && data.target) {
            return `${data.source} → ${data.target}<br/>Value: ${data.value}`;
          }
          return data.name;
        }
      },
      // 添加工具栏
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [{
        type: 'sankey',
        data: data.nodes,
        links: data.links,
        draggable: true, // 启用节点拖拽
        emphasis: {
          focus: 'adjacency'
        },
        nodeAlign: 'left', // 节点对齐方式
        layoutIterations: 32, // 布局迭代次数，提高布局质量
        levels: [
          {
            depth: 0,
            itemStyle: { color: '#fbb4ae' },
            lineStyle: { color: 'source', opacity: 0.6 }
          },
          {
            depth: 1,
            itemStyle: { color: '#b3cde3' },
            lineStyle: { color: 'source', opacity: 0.6 }
          },
          {
            depth: 2,
            itemStyle: { color: '#ccebc5' },
            lineStyle: { color: 'source', opacity: 0.6 }
          },
          {
            depth: 3,
            itemStyle: { color: '#decbe4' },
            lineStyle: { color: 'source', opacity: 0.6 }
          }
        ],
        lineStyle: {
          curveness: 0.5
        }
      }]
    });
  }, [dataSource, setOptions, formatMessage]);

  // 在组件挂载后注册事件监听器
  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    if (chart) {
      // 监听节点拖动事件
      chart.on('dragstart', function (params: any) {
        chart.dispatchAction({
          type: 'sankeyFocusNodeAdjacency',
          dataIndex: params.dataIndex
        });
      });

      chart.on('dragend', function () {
        chart.dispatchAction({
          type: 'sankeyUnfocusNodeAdjacency'
        });
      });

      // 双击恢复布局
      chart.on('dblclick', function () {
        chart.setOption(options);
      });

      const zr = chart.getZr();
      chart.on('graphRoam', (e: { zoom: any; }) => {
        const zoom = e.zoom;
        if (zoom) {
          var els = zr.storage.getDisplayList();
          els.forEach((el: { style: { opacity: number; }; attr: (arg0: string, arg1: any[]) => void; }) => {
            if (el.style.opacity > 0) {
              el.attr('scale', [zoom, zoom]);
            }
          });
        }
      })
    }

    return () => {
      if (chart) {
        chart.off('dragstart');
        chart.off('dragend');
        chart.off('dblclick');
      }
    };
  }, [options]);

  return (
    options && (
      <ReactECharts
        ref={chartRef}
        option={options}
        style={{ height: '960px', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    )
  );
};

export default DatamapSankey;
