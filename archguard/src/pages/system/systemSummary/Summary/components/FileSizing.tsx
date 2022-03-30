import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CodeSupport from "@/pages/system/systemSummary/Summary/d3Support/CodeSupport";
import { getGitPathChanges } from "@/api/module/gitFile";
import MenuSupport from "@/pages/system/systemSummary/Summary/d3Support/MenuSupport";

interface FileSizingProps {
  systemId: String
}

const FileSizing = (props: FileSizingProps) => {
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
      // @ts-ignore
      dMap[datum.name] = {
        name:  datum.name,
        value: datum.value
      }
    }

    let jdata = Object.values(dMap)
    let hierarchy = CodeSupport.hierarchy(jdata);

    let pack = function (data: any) {
      return d3.pack()
        .size([svgWidth, svgHeight])
        .padding(3)
        (d3.hierarchy(data)
          .sum(d => d.value)
          .sort((a: any, b: any) => b.value - a.value))
    }

    let color = d3.scaleLinear()
      .domain([0, 10])
      // @ts-ignore
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      // @ts-ignore
      .interpolate(d3.interpolateHcl)

    const root = pack(hierarchy);

    let focus = root;
    let view: d3.ZoomView;

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
      .text((d: any) => {
        if (!d.data.value) {
          return d.data.name
        }
        return d.data.name + ":" + d.data.value;
      });

    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v: any) {
      const k = svgWidth / v[2];

      view = v;

      label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("r", d => d.r * k);
    }

    function zoom(d: any) {
      focus = d;

      label
        .filter(function (d: any) {
          // @ts-ignore
          return d.parent === focus || this.style.display === "inline";
        })
        // @ts-ignore
        .transition(svg.transition()
          .duration(750)
          .tween("zoom", (d: any) => {
            // @ts-ignore
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return (t: any) => zoomTo(i(t));
          }))
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function (d) {
          // @ts-ignore
          if (d.parent === focus) this.style.display = "inline";
        })
        .on("end", function (d) {
          // @ts-ignore
          if (d.parent !== focus) this.style.display = "none";
        });
    }
  }

  useEffect(() => {
    getGitPathChanges(props.systemId).then((res) => {
      setData(res as any);
    });
  }, [setData]);

  useEffect(() => {
    if (!!data) {
      render(data as any)
    }
  }, [data]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight}/>;
};

export default FileSizing;
