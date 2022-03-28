/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { CSSProperties } from "react";
import CytoscapeComponent from "@/pages/servicesMap/graph/cytoscape";

export enum FETCH_STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure',
  NOT_INITIATED = 'not_initiated',
}

export const getCytoscapeDivStyle = (
  status: FETCH_STATUS
): CSSProperties => ({
  background: `linear-gradient(90deg, #1a1b20 calc(24px - calc($4px/ 2)), transparent 1%)
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

function ServicesMapGraph(props: ServicesMapGraphProps) {
  const heightWithPadding = 1000;
  const status = "success";

  // const elements = {
  //   nodes: [
  //     { data: { id: '0-0', 'service.name': "Demo" } },
  //     { data: { id: '0-1', 'service.name': "Demo 1" } },
  //     { data: { id: '0-2', 'service.name': "Demo 2" } },
  //   ],
  //   edges: [
  //     { data: { source: '0-0', target: '0-1', id: '1' } },
  //     { data: { source: '0-1', target: '0-2', id: '2' } },
  //   ]
  // }

  return (
    <div style={ { height: heightWithPadding } }>
      <CytoscapeComponent elements={ props.datasource }
                          height={ heightWithPadding }
                          serviceName={ "Services Map" }
                          style={ getCytoscapeDivStyle(status) }>
        { "Services Map" }
      </CytoscapeComponent>
    </div>)
}

export default ServicesMapGraph
