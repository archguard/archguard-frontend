import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./ServicesMapMapping.less"
import { Table } from "antd";
import { useIntl } from "@@/plugin-locale/localeExports";

interface ServicesMapMappingProps {
  datasource: any[],
  unmapUrls: any[],
}

const ServicesMapMapping = (props: ServicesMapMappingProps) => {
  const { formatMessage } = useIntl();
  const [data] = useState(props.datasource);
  const [unmapUrls] = useState(props.unmapUrls);
  const svgRef = useRef(null);
  const width = 920;
  const height = 600;
  const innerRadius = Math.min(width, height) * 0.5 - 90
  const outerRadius = innerRadius + 10

  const unmapColumns = [
    { title: 'service', dataIndex: 'service' },
    { title: 'originUrl', dataIndex: 'originUrl' },
    { title: 'process url', dataIndex: 'url', },
  ]

  useEffect(() => {
    if (!data) {
      return;
    }

    d3.select(svgRef.current).selectAll("g").remove();
    const svgEl = d3.select(svgRef.current)

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

    // @ts-ignore
    const names: any[] = Array.from(new Set(data.flatMap((d: any) => [d.source, d.target]))).sort(d3.ascending)

    const color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length))

    const index = new Map(names.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(names.length).fill(0));
    // @ts-ignore
    for (const { source, target, value } of data) {
      // @ts-ignore
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

    group.append("path")
      .attr("fill", d => color(names[d.index]))
      // @ts-ignore
      .attr("d", arc);

    group.append("text")
      // @ts-ignore
      .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
      .attr("dy", "0.35em")
      // @ts-ignore
      .attr("transform", (d: any) => `
        rotate(${ (d.angle * 180 / Math.PI - 90) })
        translate(${ outerRadius + 5 })
        ${ d.angle > Math.PI ? "rotate(180)" : "" }
      `)
      .attr("text-anchor", (d: any) => d.angle > Math.PI ? "end" : null)
      .text(d => names[d.index]);

    function outgoingCount(d: any) {
      // @ts-ignore
      return d3.sum(chords, (c: any) => (c.source.index === d.index) * c.source.value);
    }

    function incomingCount(d: any) {
      // @ts-ignore
      return d3.sum(chords, (c: any) => (c.target.index === d.index) * c.source.value);
    }

    group.append("title")
      .text((d: any) => `${ names[d.index] }
${ (outgoingCount(d)) } outgoing →
${ (incomingCount(d)) } incoming ←`);

    svg.append("g")
      .attr("fill-opacity", 0.75)
      .selectAll("path")
      .data(chords)
      .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("fill", (d: any) => color(names[d.target.index]))
      // @ts-ignore
      .attr("d", ribbon)
      .append("title")
      .text(d => `${ names[d.source.index] } → ${ names[d.target.index] } ${ d.source.value }`);
  }, [data]);

  return <div className={ styles.service }>
    <svg ref={ svgRef } width={ width } height={ height }/>
    <div>
      <h2>{ formatMessage({ id: 'UNMATCH_URL'}) }</h2>
      <Table dataSource={ unmapUrls } columns={ unmapColumns }/>
    </div>
  </div>;
};

export default ServicesMapMapping;
