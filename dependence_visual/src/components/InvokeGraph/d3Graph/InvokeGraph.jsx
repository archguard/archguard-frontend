import React, { Component } from "react";
import { drawGraph } from "./drawGraph";
import { filterDataWithConfig} from '../utils'

import "./InvokeGraph.css";

export default class InvokeGraph extends Component {

  componentWillReceiveProps(nextProps){
    if (this.props.data !== nextProps.data || this.props.configs !== nextProps.configs) {
      drawGraph(
        nextProps.id || "graph",
        filterDataWithConfig(nextProps.data, nextProps.configs),
        nextProps.title,
        nextProps.rankdir,
        nextProps.onNodeClick
      );
    }
    
  }

  render() {
    const id = this.props.id || "graph";
    return (
      <div>
        <svg
          id={id}
          width={this.props.width || "100%"}
          height={this.props.height || 1800}
        ></svg>
      </div>
    );
  }
}
