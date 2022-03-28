/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { CSSProperties } from "react";
import { Cytoscape } from "@/pages/servicesMap/graph/cytoscape";
import { useRefDimensions } from "@/pages/servicesMap/graph/dimensions";

export enum FETCH_STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure',
  NOT_INITIATED = 'not_initiated',
}

export const getCytoscapeDivStyle = (
  status: FETCH_STATUS
): CSSProperties => ({
  background: `linear-gradient(90deg, #fafbfd calc(24px - calc($4px/ 2)), transparent 1%)
center,
linear-gradient(#fafbfd calc(24px - calc($4px/ 2)))), transparent 1%)
center, #d3dae6`,
  backgroundSize: `24px 4px}`,
  cursor: `${ status === FETCH_STATUS.LOADING ? 'wait' : 'grab' }`,
  marginTop: 0,
});


interface ServicesMapGraphProps {
  datasource: any[]
}

function ServicesMapGraph(props: ServicesMapGraph) {
  // const { data } = props.datasource;
  const { ref, height } = useRefDimensions();
  const PADDING_BOTTOM = 24;
  const heightWithPadding = height - PADDING_BOTTOM;
  const status = "success";
  const elements = {
    nodes: [
      { data: { id: '0-0' } },
      { data: { id: '0-1' } },
      { data: { id: '0-2' } },
    ],
    edges: [
      { data: { source: '0-0', target: '0-1', id: '1' } },
      { data: { source: '0-1', target: '0-2', id: '2' } },
    ]
  }

  return (
    <div style={ { height: heightWithPadding } } ref={ ref }>
      <Cytoscape elements={ elements } height={ heightWithPadding } serviceName={ "ServicesMap" }
                 style={ getCytoscapeDivStyle(status) }>
        { "serviceName" }
      </Cytoscape>
    </div>)
}

export default ServicesMapGraph
