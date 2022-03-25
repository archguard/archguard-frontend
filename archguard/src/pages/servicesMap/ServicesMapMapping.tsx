import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { queryFlareData } from "@/api/module/containerService";

const ServicesMapMapping = () => {
  const [data, setData] = useState(null);
  const svgRef = useRef(null);
  const svgEl = d3.select(svgRef.current);
  const width = 1920;
  const height = 1200;
  const innerRadius = Math.min(width, height) * 0.5 - 90
  const outerRadius = innerRadius + 10

  function render(origin: any[]) {
    const chord = d3.chordDirected()
      .padAngle(10 / innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending)

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

    const ribbon = d3.ribbonArrow()
      .radius(innerRadius - 1)
      .padAngle(1 / innerRadius)

    const rename = (name: any) => name.substring(name.indexOf(".") + 1, name.lastIndexOf("."))
    var data = Array.from(d3.rollup(origin
        .flatMap(({name: source, imports}) => imports.map((target: any) => [rename(source), rename(target)])),
      ({0: [source, target], length: value}) => ({source, target, value}), link => link.join())
      .values())

    const names = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending)

    const color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length))

    const index = new Map(names.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(names.length).fill(0));
    for (const {source, target, value} of data) matrix[index.get(source)][index.get(target)] += value;

    const svg = svgEl.attr("viewBox", [-width / 2, -height / 2, width, height]);

    console.log(names, data, matrix)
    const chords = chord(matrix);
    console.log(chords)

    const group = svg.append("g")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .selectAll("g")
      .data(chords.groups)
      .join("g");

    group.append("path")
      .attr("fill", d => color(names[d.index]))
      .attr("d", arc);

    group.append("text")
      .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
      .attr("dy", "0.35em")
      .attr("transform", d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${outerRadius + 5})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
      .text(d => names[d.index]);

    group.append("title")
      .text(d => `${names[d.index]}
${d3.sum(chords, c => (c.source.index === d.index) * c.source.value)} outgoing →
${d3.sum(chords, c => (c.target.index === d.index) * c.source.value)} incoming ←`);

    svg.append("g")
      .attr("fill-opacity", 0.75)
      .selectAll("path")
      .data(chords)
      .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("fill", d => color(names[d.target.index]))
      .attr("d", ribbon)
      .append("title")
      .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);

  }

  useEffect(() => {
    queryFlareData().then((res) => {
      setData([
        {
          "name": "flare.analytics.cluster.AgglomerativeCluster",
          "size": 3938,
          "imports": ["flare.animate.Transitioner", "flare.vis.data.DataList", "flare.util.math.IMatrix", "flare.analytics.cluster.MergeEdge", "flare.analytics.cluster.HierarchicalCluster", "flare.vis.data.Data"]
        },
        {
          "name": "flare.analytics.cluster.CommunityStructure",
          "size": 3812,
          "imports": ["flare.analytics.cluster.HierarchicalCluster", "flare.animate.Transitioner", "flare.vis.data.DataList", "flare.analytics.cluster.MergeEdge", "flare.util.math.IMatrix"]
        },
        {
          "name": "flare.analytics.cluster.HierarchicalCluster",
          "size": 6714,
          "imports": ["flare.vis.data.EdgeSprite", "flare.vis.data.NodeSprite", "flare.vis.data.DataList", "flare.vis.data.Tree", "flare.util.Arrays", "flare.analytics.cluster.MergeEdge", "flare.util.Sort", "flare.vis.operator.Operator", "flare.util.Property", "flare.vis.data.Data"]
        },
      ] as any);
    });
  }, [setData]);

  useEffect(() => {
    if (!!data) {
      render(data as any)
    }
  }, [data]);

  return <div>
    <svg ref={svgRef} width={width} height={height}/>
  </div>;
};

export default ServicesMapMapping;
