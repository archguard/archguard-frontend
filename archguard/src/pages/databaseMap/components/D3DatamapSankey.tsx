'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { sankey, sankeyLinkHorizontal, SankeyGraph, SankeyLink, SankeyNode } from 'd3-sankey'
import { useIntl } from 'react-intl'

interface DatamapSankeyProps {
  dataSource: any[]
}

const D3DatamapSankey: React.FC<DatamapSankeyProps> = ({ dataSource }) => {
  const { formatMessage } = useIntl()
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Detect cycles in the graph using DFS
  const detectCycles = (graph: Map<string, Set<string>>, start: string): string[] => {
    const visited = new Set<string>()
    const path = new Set<string>()
    const cycles: string[] = []

    const dfs = (node: string): boolean => {
      visited.add(node)
      path.add(node)

      const neighbors = graph.get(node) || new Set()
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor)) {
            cycles.push(`${node}->${neighbor}`)
          }
        } else if (path.has(neighbor)) {
          cycles.push(`${node}->${neighbor}`)
          return true
        }
      }

      path.delete(node)
      return false
    }

    dfs(start)
    return cycles
  }

  // Build directed graph and remove cycles
  const buildAcyclicGraph = (nodes: Set<string>, links: Map<string, number>) => {
    const graph = new Map<string, Set<string>>()
    for (const [link, _] of links) {
      const [source, target] = link.split('->')
      if (!graph.has(source)) {
        graph.set(source, new Set())
      }
      graph.get(source)?.add(target)
    }

    const processedLinks = new Map(links)
    for (const node of nodes) {
      const cycles = detectCycles(graph, node)
      for (const cycle of cycles) {
        processedLinks.delete(cycle)
      }
    }

    return processedLinks
  }

  useEffect(() => {
    if (!dataSource || !svgRef.current) return

    const nodes = new Set<string>()
    const links = new Map<string, number>()

    // Process nodes and links
    for (const datum of dataSource) {
      const tables = datum.tables.split(',')
      const className = datum.className
      const packageName = datum.packageName

      if (tables.length === 0) continue

      nodes.add(className)
      nodes.add(packageName)
      tables.forEach((table: string) => nodes.add(table))

      for (const table of tables) {
        const classToTable = `${className}->${table}`
        const packageToClass = `${packageName}->${className}`

        links.set(classToTable, (links.get(classToTable) || 0) + 1)
        links.set(packageToClass, (links.get(packageToClass) || 0) + 1)
      }
    }

    // Remove cycles and build final data structure
    const acyclicLinks = buildAcyclicGraph(nodes, links)
    let nodesArray = Array.from(nodes)
    const data = {
      nodes: nodesArray.map(name => ({ name })),
      links: Array.from(acyclicLinks.entries()).map(([key, value]) => {
        const [source, target] = key.split('->')
        let sourceIndex = nodesArray.indexOf(source)
        let targetIndex = nodesArray.indexOf(target)
        return { source: sourceIndex, target: targetIndex, value }
      })
    }

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove() // Clear previous content

    const width = dimensions.width
    const height = dimensions.height

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform)
      })

    // Apply zoom behavior to svg
    svg.call(zoom as any)
      .on('dblclick.zoom', null) // Disable double-click zoom

    // Create a container group for all elements
    const container = svg.append('g')
      .attr('class', 'container')

    const sankeyGenerator = sankey<SankeyNode, SankeyLink>()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 5]])

    const { nodes: sankeyNodes, links: sankeyLinks } = sankeyGenerator(data as unknown as SankeyGraph<SankeyNode, SankeyLink>)

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

    // Draw links in container
    container.append('g')
      .attr('class', 'links')
      .selectAll('path')
      .data(sankeyLinks)
      .enter()
      .append('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('fill', 'none')
      .attr('stroke', (d: any) => colorScale(d.source.name) as string)
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', (d: any) => Math.max(1, d.width))

    // Draw nodes in container
    const node = container.append('g')
      .attr('class', 'nodes')
      .selectAll('rect')
      .data(sankeyNodes)
      .enter()
      .append('rect')
      .attr('x', (d: any) => d.x0)
      .attr('y', (d: any) => d.y0)
      .attr('height', (d: any) => d.y1 - d.y0)
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('fill', (d: any) => colorScale(d.name) as string)
      .attr('opacity', 0.8)

    // Add node labels in container
    container.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(sankeyNodes)
      .enter()
      .append('text')
      .attr('x', (d: any) => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr('y', (d: any) => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => d.x0 < width / 2 ? 'start' : 'end')
      .text((d: any) => d.name)
      .attr('font-size', '10px')
      .attr('fill', '#000')

    // Add title (fixed position, outside of container)
    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .text(formatMessage({ id: 'DATAMAP_DEP_CALL_MAP' }))

    // Add tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', '1px solid #ddd')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')

    // Add zoom controls
    const zoomControls = svg.append('g')
      .attr('class', 'zoom-controls')
      .attr('transform', `translate(20, ${height - 60})`)

    // Zoom in button
    zoomControls.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 30)
      .attr('height', 30)
      .attr('fill', '#f0f0f0')
      .attr('stroke', '#999')
      .style('cursor', 'pointer')
      .on('click', () => {
        svg.transition()
          .duration(750)
          .call(zoom.scaleBy as any, 1.2)
      })

    zoomControls.append('text')
      .attr('x', 15)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text('+')
      .style('pointer-events', 'none')

    // Zoom out button
    zoomControls.append('rect')
      .attr('x', 0)
      .attr('y', 35)
      .attr('width', 30)
      .attr('height', 30)
      .attr('fill', '#f0f0f0')
      .attr('stroke', '#999')
      .style('cursor', 'pointer')
      .on('click', () => {
        svg.transition()
          .duration(750)
          .call(zoom.scaleBy as any, 0.8)
      })

    zoomControls.append('text')
      .attr('x', 15)
      .attr('y', 55)
      .attr('text-anchor', 'middle')
      .text('-')
      .style('pointer-events', 'none')

    // Reset button
    zoomControls.append('rect')
      .attr('x', 35)
      .attr('y', 0)
      .attr('width', 50)
      .attr('height', 30)
      .attr('fill', '#f0f0f0')
      .attr('stroke', '#999')
      .style('cursor', 'pointer')
      .on('click', () => {
        svg.transition()
          .duration(750)
          .call(zoom.transform as any, d3.zoomIdentity)
      })

    zoomControls.append('text')
      .attr('x', 60)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text('Reset')
      .style('pointer-events', 'none')

    // Event handlers
    node.on('mouseover', (event: MouseEvent, d: any) => {
      tooltip.transition()
        .duration(200)
        .style('opacity', .9)
      tooltip.html(`${d.name}`)
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 28}px`)
    })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0)
      })

    container.selectAll('path')
      .on('mouseover', (event: MouseEvent, d: any) => {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9)
        tooltip.html(`${d.source.name} → ${d.target.name}<br/>Value: ${d.value}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`)
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0)
      })

  }, [dataSource, dimensions, formatMessage])

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions()

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <div style={{ width: '100%', height: '1600px' }}>
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  )
}

export default D3DatamapSankey
