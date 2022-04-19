import React, { CSSProperties, useEffect, useState } from "react";
import ServicesMapComponent from "@/pages/servicesMap/graph/ServicesMapComponent";

export const getCytoscapeDivStyle = (): CSSProperties => ({
  background: `linear-gradient(90deg, #fafbfd 30px, transparent 20%) center, linear-gradient(#fafbfd 30px, transparent 20%) center, #d3dae6`,
  backgroundSize: `32px 32px`,
  height: '800px',
  cursor: 'grab',
  marginTop: 0,
});

interface ServicesMapGraphProps {
  datasource: {
    edges: any[],
    nodes: any[]
  }
}

function ServicesMapGraph(props: ServicesMapGraphProps) {
  const heightWithPadding = 800;
  const [elements, setElements] = useState(null)

  useEffect(() => {
    let nodes = props.datasource.nodes.map((item) => ({ data: item }))
    let edges = props.datasource.edges.map((item) => ({ data: item }));
    let convertData = nodes.concat(edges)

    // @ts-ignore
    setElements(convertData)
  }, [props.datasource, setElements])

  return (
    <div style={ { height: heightWithPadding } }>
      { elements &&
        <ServicesMapComponent
          elements={ elements }
          height={ heightWithPadding }
          serviceName={ "Services Map" }
          style={ getCytoscapeDivStyle() }>
        </ServicesMapComponent>
      }
    </div>)
}

export default ServicesMapGraph
