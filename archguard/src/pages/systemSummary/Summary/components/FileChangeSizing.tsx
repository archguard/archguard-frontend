import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CodeSupport from "@/pages/systemSummary/Summary/d3Support/CodeSupport";
import { getGitPathChanges } from "@/api/module/gitFile";
import { voronoiTreemap } from "d3-voronoi-treemap"

const FileSizing = () => {
  const [data, setData] = useState(null);
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
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

    const treemap = voronoiTreemap().clip([
      [0, 0],
      [0, svgHeight],
      [svgWidth, svgHeight],
      [svgWidth, 0],
    ]);
    let layout = treemap(rootNode);

    let names = d3.group(data, d => d.name);
    let color = d3.scaleOrdinal(d3.schemeSet2).domain(names)

    let createTooltip = function (el) {
      el
        .attr("class", "tooltip")
        .style("pointer-events", "none")
        .style("top", 0)
        .style("opacity", 0)
    }
    const tooltip = d3.select(tooltipRef.current).call(createTooltip);

    const voronoi = svgEl.append("g").attr("transform", "translate(" + 10 + "," + 10 + ")");
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
        return d3.color(color(d.value));
      })
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", "0.5")
        console.log(event)
        tooltip
          .style("opacity", 1)
          .html(`<h3>${d.data.name}, lines: ${d.data.lines}, change: ${d.data.value}</h3>`)
      })
  }

  useEffect(() => {
    getGitPathChanges().then((res) => {
      setData(res);
    });
  }, [setData]);

  useEffect(() => {
    if (!!data) {
      render(data)
    }
  }, [data]);

  return <div>
    <svg ref={svgRef} width={svgWidth} height={svgHeight}/>
    <div ref={tooltipRef}/>
  </div>;
};

export default FileSizing;
