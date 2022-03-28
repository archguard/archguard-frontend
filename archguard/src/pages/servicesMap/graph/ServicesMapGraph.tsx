/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { CSSProperties, useEffect, useState } from "react";
import CytoscapeComponent from "@/pages/servicesMap/graph/cytoscape";

export enum FETCH_STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure',
  NOT_INITIATED = 'not_initiated',
}

export const getCytoscapeDivStyle = (): CSSProperties => ({
  background: `linear-gradient(90deg, #fafbfd 30px, transparent 20%) center, linear-gradient(#fafbfd 30px, transparent 20%) center, #d3dae6`,
  backgroundSize: `32px 32px`,
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
    let convertData = {
      nodes: props.datasource.nodes.map((item) => ({ data: item })),
      edges: props.datasource.edges.map((item) => ({ data: item }))
    };

    setElements(convertData)
  }, [props.datasource, setElements])


  return (
    <div style={ { height: heightWithPadding } }>
      { elements &&
        <CytoscapeComponent
          elements={ elements }
          height={ heightWithPadding }
          serviceName={ "Services Map" }
          style={ getCytoscapeDivStyle() }>
        </CytoscapeComponent>
      }
    </div>)
}

export default ServicesMapGraph
