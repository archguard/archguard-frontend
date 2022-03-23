import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CodeSupport from "@/pages/systemSummary/Summary/d3Support/CodeSupport";
import { getGitPathChanges } from "@/api/module/gitFile";

const FileSizing = () => {
  const [ data, setData ] = useState(null);
  const svgRef = useRef(null);
  const svgEl = d3.select(svgRef.current);
  const svgWidth = 600;
  const svgHeight = 600;

  function render(data: any[]) {
    if(data && data.length === 0) {
      return
    }

    let dMap = {};

    for (let datum of data) {
      dMap["root." + datum.name] = {
        name: "root." + datum.name,
        value: datum.value
      }
    }

    let jdata = Object.values(dMap)
    let hierarchy = CodeSupport.hierarchy(jdata);

    let pack = function (data) {
      return d3.pack()
        .size([svgWidth, svgHeight])
        .padding(3)
        (d3.hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value))
    }

    let color = d3.scaleLinear()
      .domain([0, 10])
       // rgb(252, 253, 191)-rgb(231, 82, 99)-rgb(183, 55, 121)
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl)

    const root = pack(hierarchy);

    let focus = root;
    let view;

    const svg = svgEl.attr("viewBox", `-${svgWidth / 2} -${svgHeight / 2} ${svgWidth} ${svgHeight}`);

    svg.style("display", "block")
      .style("background", color(0))
      .style("cursor", "pointer")
      .attr("text-anchor", "middle")
      .on("click", () => zoom(root));

    const node = svg.append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : "white")
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function () {
        d3.select(this).attr("stroke", "#000");
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", null);
      })
      .on("click", (event, d) => focus !== d && (zoom(d), event.stopPropagation()))
      .on("contextmenu", (event, d) => {
        MenuSupport.createContextMenu(event, d, MenuSupport.defaultMenuItems, svg, {
          width: -svgWidth / 2,
          height: -svgHeight / 2
        });
        event.stopPropagation();
      })

    const label = svg.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(d => {
        if (!d.data.value) {
          return d.data.name
        }
        return d.data.name + ":" + d.data.value;
      });

    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v) {
      const k = svgWidth / v[2];

      view = v;

      label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("r", d => d.r * k);
    }

    function zoom(d) {
      focus = d;

      label
        .filter(function (d) {
          return d.parent === focus || this.style.display === "inline";
        })
        .transition(svg.transition()
          .duration(750)
          .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
          }))
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function (d) {
          if (d.parent === focus) this.style.display = "inline";
        })
        .on("end", function (d) {
          if (d.parent !== focus) this.style.display = "none";
        });
    }
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

  return <svg ref={svgRef} width={svgWidth} height={svgHeight}/>;
};

export default FileSizing;
