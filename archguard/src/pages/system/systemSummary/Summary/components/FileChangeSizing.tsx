import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CodeSupport from "@/pages/system/systemSummary/Summary/d3Support/CodeSupport";
import { getGitPathChanges } from "@/api/module/gitFile";
import { voronoiTreemap } from "d3-voronoi-treemap"

interface FileChangeSizingProps {
  systemId: String
}

const FileChangeSizing = (props: FileChangeSizingProps) => {
  const [data, setData] = useState(null);
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const markedRef = useRef(null);
  const svgEl = d3.select(svgRef.current);
  const svgWidth = 600;
  const svgHeight = 600;

  function render(data: any[]) {
    if (data && data.length === 0) {
      return
    }

    let dMap = {};

    for (let datum of data) {
      dMap[datum.name] = {
        name: datum.name,
        value: datum.value,
        lines: datum.lines || 0
      }
    }

    let dataMap = Object.values(dMap)
    let hierarchy = CodeSupport.hierarchy(dataMap);
    const rootNode = d3.hierarchy(hierarchy).sum(function (d) {
      return d.value || 0;
    });

    let count = rootNode.value / data.length * 6;
    let averageCount = count > 20 ? count : 20;

    // todo: change layout see in: https://bl.ocks.org/veltman/522135ac8dcf20a2e96cadfc595e07e4
    const treemap = voronoiTreemap().clip([
      [0, 0],
      [0, svgHeight],
      [svgWidth, svgHeight],
      [svgWidth, 0],
    ]);
    treemap(rootNode);

    let color = d3.scaleLinear()
      .domain([0, 200, 1000])
      .range(['#475485', 'blue', 'red']);

    let createTooltip = function (el) {
      el
        .attr("class", "tooltip")
        .style("pointer-events", "none")
        .style("top", 0)
        .style("opacity", 0)
    }
    const tooltip = d3.select(tooltipRef.current).call(createTooltip);

    const fullName = (data) => {
      if (!!data.parent) {
        return `${fullName(data.parent)}/${data.data.name}`
      }

      return data.data.name
    }

    const voronoi = svgEl.append("g")
    let allNodes = rootNode.descendants();
    voronoi.selectAll('path')
      .data(allNodes)
      .enter()
      .append('path')
      .attr('d', function (d) {
        return d3.line()(d.polygon) + 'z';
      })
      .attr("stroke", "#F5F5F2")
      .style('fill', function (d) {
        return color(d.data.lines);
      })
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", "0.5")
        tooltip
          .style("opacity", 1)
          .html(`<h3>${fullName(d)}, lines: ${d.data.lines}, change: ${d.data.value}</h3>`)
      })
      .on("mouseleave", function (event, d) {
        d3.select(this).attr("opacity", "1")
        tooltip.style("opacity", 0)
      })
      .on("click", function (event, d) {
        d3.select(markedRef.current)
          .call(createTooltip)
          .style("opacity", 1)
          .html(`<h3>${fullName(d)}, lines: ${d.data.lines}, change: ${d.data.value}</h3>`)
      });

    const labels = svgEl.append("g")
    labels.selectAll('text')
      .data(allNodes.filter(d => {
        if (d.data.value && d.data.value) {
          if (d.data.value > averageCount) {
            return true;
          }
        }

        return false;
      }))
      .enter()
      .append('text')
      .attr('class', d => `label-${d.id}`)
      .attr('text-anchor', 'middle')
      .attr("transform", d => {
        if (d.polygon.site && d.polygon.site) {
          return "translate(" + [d.polygon.site.x, d.polygon.site.y] + ")";
        }
        return "translate(0, 0)"
      })
      .text(d => {
        return d.data.name;
      })
      .attr('cursor', 'default')
      .attr('pointer-events', 'none')
      .attr('fill', 'white')
  }

  useEffect(() => {
    getGitPathChanges(props.systemId).then((res) => {
      setData(res);
    });
  }, [props.systemId, setData]);

  useEffect(() => {
    if (!!data) {
      render(data)
    }
  }, [data]);

  return <div>
    <svg ref={svgRef} width={svgWidth} height={svgHeight}/>
    <div ref={tooltipRef}/>
    <div ref={markedRef}/>
  </div>;
};

export default FileChangeSizing;
