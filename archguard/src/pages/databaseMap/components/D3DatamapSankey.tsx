import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
// @ts-ignore
import { sankey, sankeyLinkHorizontal } from 'd3-sankey'

// Define the type for our data
type CallChainItem = {
  id: string
  packageName: string
  className: string
  functionName: string
  systemId: string
  tables: string
}

// Define props for our component
type SankeyDiagramProps = {
  dataSource: CallChainItem[]
}

export default function SankeyDiagram({ dataSource }: SankeyDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!dataSource || dataSource.length === 0) return

    const margin = { top: 10, right: 10, bottom: 10, left: 10 }
    const width = 960 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Process data for Sankey diagram
    const nodeSet = new Set<string>()
    const links: { source: number; target: number; value: number }[] = []

    dataSource.forEach((item) => {
      nodeSet.add(item.packageName)
      nodeSet.add(item.className)
      nodeSet.add(item.functionName)
      nodeSet.add(item.tables)
    })
    let nodeArray = Array.from(nodeSet);
    const nodes = nodeArray.map((name) => ({ name }))

    dataSource.forEach((item) => {
      links.push(
        { source: nodeArray.indexOf(item.packageName), target: nodeArray.indexOf(item.className), value: 1 },
        { source: nodeArray.indexOf(item.className), target: nodeArray.indexOf(item.functionName), value: 1 },
        { source: nodeArray.indexOf(item.functionName), target: nodeArray.indexOf(item.tables), value: 1 }
      )
    });

    console.log(nodeSet)
    console.log(nodes)

    const sankeyGenerator = sankey<any, any>()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 6]])

    const sankeyData = sankeyGenerator({
      nodes: nodes,
      links: links,
    })

    console.log(sankeyData)

    svg
      .append("g")
      .selectAll("path")
      .data(sankeyData.links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)
      .attr("stroke-width", (d: any) => Math.max(1, d.width))

    const node = svg
      .append("g")
      .selectAll("rect")
      .data(sankeyData.nodes)
      .join("rect")
      .attr("x", (d: any) => d.x0)
      .attr("y", (d: any) => d.y0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("fill", "#69b3a2")

    node
      .on("mouseover", function () {
        d3.select(this).attr("fill", "#ff7f0e")
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#69b3a2")
      })

    svg
      .append("g")
      .selectAll("text")
      .data(sankeyData.nodes)
      .join("text")
      .attr("x", (d: any) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", (d: any) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => (d.x0 < width / 2 ? "start" : "end"))
      .text((d: any) => d.name)
      .style("font-size", "10px")

  }, [dataSource])

  return (
    <div className="w-full h-full flex justify-center items-center bg-white p-4">
      <svg ref={svgRef}></svg>
    </div>
  )
}
