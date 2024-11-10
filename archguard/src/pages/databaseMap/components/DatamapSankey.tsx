import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useIntl } from "@@/plugin-locale/localeExports";

interface DatamapSankeyProps {
  dataSource: any[]
}

const DatamapSankey = (props: DatamapSankeyProps) => {
  const { formatMessage } = useIntl();
  const [dataSource] = useState(props.dataSource);
  const [options, setOptions] = useState(null as any);

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
    // Build adjacency list
    const graph = new Map<string, Set<string>>();
    for (const [link, _] of links) {
      const [source, target] = link.split('->');
      if (!graph.has(source)) {
        graph.set(source, new Set());
      }
      graph.get(source)?.add(target);
    }

    // Detect and remove cycles
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

      // Add nodes
      nodes.add(className);
      nodes.add(packageName);
      tables.forEach(table => nodes.add(table));

      // Process links
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
      series: [{
        type: 'sankey',
        data: data.nodes,
        links: data.links,
        emphasis: {
          focus: 'adjacency'
        },
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

  return (
    options && (
      <ReactECharts
        option={options}
        style={{ height: '960px', width: '100%' }}
      />
    )
  );
};

export default DatamapSankey;
