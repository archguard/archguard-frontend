import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./ServicesMapMapping.less"
import { queryFlareData } from "@/api/module/containerService";
import { urlMapping } from "@/pages/servicesMap/UrlMapping";
import { Table } from "antd";

const ServicesMapMapping = () => {
  const [data, setData] = useState(null);
  const [unmap, setUnmap] = useState([] as any);
  const svgRef = useRef(null);
  const svgEl = d3.select(svgRef.current);
  const width = 920;
  const height = 600;
  const innerRadius = Math.min(width, height) * 0.5 - 90
  const outerRadius = innerRadius + 10

  const unmapColumns = [
    {title: 'service', dataIndex: 'service'},
    {title: 'originUrl', dataIndex: 'originUrl'},
    {title: 'process url', dataIndex: 'url',},
  ]

  function render(data: any[]) {
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

    const names = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending)

    const color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length))

    const index = new Map(names.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(names.length).fill(0));
    for (const {source, target, value} of data) { // @ts-ignore
      matrix[index.get(source)][index.get(target)] += value;
    }

    const svg = svgEl.attr("viewBox", [-width / 2, -height / 2, width, height]);
    const chords = chord(matrix);

    const group = svg.append("g")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .selectAll("g")
      .data(chords.groups)
      .join("g");

    // @ts-ignore
    group.append("path")
      .attr("fill", d => color(names[d.index]))
      .attr("d", arc);

    group.append("text")
      // @ts-ignore
      .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
      .attr("dy", "0.35em")
      // @ts-ignore
      .attr("transform", d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${outerRadius + 5})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
      .text(d => names[d.index]);

    group.append("title")
      .text(d => `${names[d.index]}
${d3.sum(chords, (c: any) => (c.source.index === d.index) * c.source.value)} outgoing →
${d3.sum(chords, (c: any) => (c.target.index === d.index) * c.source.value)} incoming ←`);

    svg.append("g")
      .attr("fill-opacity", 0.75)
      .selectAll("path")
      .data(chords)
      .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("fill", d => color(names[d.target.index]))
      // @ts-ignore
      .attr("d", ribbon)
      .append("title")
      .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);

  }

  useEffect(() => {
    queryFlareData().then((res: any[]) => {
      let unmap: any[] = [];
      let newData = urlMapping(res, unmap)
      setUnmap(unmap)

      setData(newData as any);
    });
  }, [setData, setUnmap]);

  useEffect(() => {
    if (!!data) {
      render(data as any)
    }
  }, [data]);

  return <div className={styles.service}>
    <svg ref={svgRef} width={width} height={height}/>
    <div>
      <h2>未匹配到的消费端 URL</h2>
      <Table dataSource={unmap} columns={unmapColumns}/>
    </div>
  </div>;
};

export default ServicesMapMapping;
