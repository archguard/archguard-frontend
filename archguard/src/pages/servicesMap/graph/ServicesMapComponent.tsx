import React, { CSSProperties, ReactNode } from 'react';

export interface CytoscapeProps {
  children?: ReactNode;
  elements: cytoscape.ElementDefinition[] | any;
  height: number;
  serviceName?: string;
  style?: CSSProperties;
}


export default function ServicesMapComponent(props: CytoscapeProps) {
  return (<div>

  </div>)
}
